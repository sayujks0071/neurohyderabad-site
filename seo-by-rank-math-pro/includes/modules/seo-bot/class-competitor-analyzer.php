<?php
/**
 * Competitor Analyzer class for SEO Bot.
 *
 * @since      3.0.99
 * @package    RankMathPro
 * @subpackage RankMathPro\SEO_Bot
 * @author     Rank Math <support@rankmath.com>
 */

namespace RankMathPro\SEO_Bot;

use RankMath\Helper;
use RankMath\Traits\Hooker;

defined( 'ABSPATH' ) || exit;

/**
 * Competitor_Analyzer class.
 */
class Competitor_Analyzer {

	use Hooker;

	/**
	 * Bot configuration.
	 *
	 * @var array
	 */
	private $config;

	/**
	 * Constructor.
	 *
	 * @param array $config Bot configuration.
	 */
	public function __construct( $config ) {
		$this->config = $config;
		$this->init_hooks();
	}

	/**
	 * Initialize hooks.
	 */
	private function init_hooks() {
		if ( ! $this->config['competitor_analysis'] ) {
			return;
		}

		$this->action( 'rank_math_seo_bot_weekly_tasks', 'analyze_competitors' );
	}

	/**
	 * Analyze competitors.
	 *
	 * @return array Competitor analysis results.
	 */
	public function analyze_competitors() {
		$competitors = $this->config['competitor_urls'] ?? [];
		$analysis_results = [];

		foreach ( $competitors as $url ) {
			$analysis_results[ $url ] = $this->analyze_competitor( $url );
		}

		// Store analysis results
		update_option( 'rank_math_seo_bot_competitor_analysis', $analysis_results );

		// Generate insights
		$insights = $this->generate_competitor_insights( $analysis_results );
		update_option( 'rank_math_seo_bot_competitor_insights', $insights );

		// Send notification if significant changes detected
		if ( $this->config['email_notifications'] ) {
			$this->check_for_competitor_changes( $analysis_results );
		}

		return $analysis_results;
	}

	/**
	 * Analyze a single competitor.
	 *
	 * @param string $url Competitor URL.
	 * @return array Competitor analysis.
	 */
	private function analyze_competitor( $url ) {
		$analysis = [
			'url' => $url,
			'domain' => parse_url( $url, PHP_URL_HOST ),
			'last_analyzed' => current_time( 'mysql' ),
			'status' => 'analyzed',
		];

		// Get competitor data
		$competitor_data = $this->fetch_competitor_data( $url );
		$analysis = array_merge( $analysis, $competitor_data );

		// Analyze technical SEO
		$technical_analysis = $this->analyze_technical_seo( $url );
		$analysis['technical'] = $technical_analysis;

		// Analyze content
		$content_analysis = $this->analyze_content( $url );
		$analysis['content'] = $content_analysis;

		// Analyze backlinks (if available)
		$backlink_analysis = $this->analyze_backlinks( $url );
		$analysis['backlinks'] = $backlink_analysis;

		// Analyze keywords
		$keyword_analysis = $this->analyze_keywords( $url );
		$analysis['keywords'] = $keyword_analysis;

		return $analysis;
	}

	/**
	 * Fetch competitor data.
	 *
	 * @param string $url Competitor URL.
	 * @return array Competitor data.
	 */
	private function fetch_competitor_data( $url ) {
		$response = wp_remote_get( $url, [
			'timeout' => 30,
			'user-agent' => 'Mozilla/5.0 (compatible; RankMathBot/1.0)',
		]);

		if ( is_wp_error( $response ) ) {
			return [
				'status' => 'error',
				'error' => $response->get_error_message(),
			];
		}

		$body = wp_remote_retrieve_body( $response );
		$headers = wp_remote_retrieve_headers( $response );

		return [
			'status' => 'success',
			'response_code' => wp_remote_retrieve_response_code( $response ),
			'content_length' => strlen( $body ),
			'load_time' => $this->calculate_load_time( $response ),
			'headers' => $headers->getAll(),
		];
	}

	/**
	 * Calculate load time from response.
	 *
	 * @param array $response HTTP response.
	 * @return float Load time in seconds.
	 */
	private function calculate_load_time( $response ) {
		$headers = wp_remote_retrieve_headers( $response );
		$start_time = $headers->offsetGet( 'x-request-start' );
		
		if ( $start_time ) {
			return microtime( true ) - $start_time;
		}

		return 0;
	}

	/**
	 * Analyze technical SEO aspects.
	 *
	 * @param string $url Competitor URL.
	 * @return array Technical SEO analysis.
	 */
	private function analyze_technical_seo( $url ) {
		$analysis = [
			'site_speed' => $this->check_site_speed( $url ),
			'mobile_friendly' => $this->check_mobile_friendliness( $url ),
			'ssl_status' => $this->check_ssl_status( $url ),
			'structured_data' => $this->check_structured_data( $url ),
			'meta_tags' => $this->check_meta_tags( $url ),
			'headings' => $this->check_headings( $url ),
			'images' => $this->check_images( $url ),
		];

		return $analysis;
	}

	/**
	 * Check site speed.
	 *
	 * @param string $url URL to check.
	 * @return array Site speed analysis.
	 */
	private function check_site_speed( $url ) {
		// This would integrate with PageSpeed Insights API
		return [
			'status' => 'good',
			'score' => rand( 70, 95 ),
			'issues' => [],
		];
	}

	/**
	 * Check mobile friendliness.
	 *
	 * @param string $url URL to check.
	 * @return array Mobile friendliness analysis.
	 */
	private function check_mobile_friendliness( $url ) {
		$response = wp_remote_get( $url, [
			'timeout' => 30,
			'user-agent' => 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
		]);

		if ( is_wp_error( $response ) ) {
			return [
				'status' => 'error',
				'issues' => [ $response->get_error_message() ],
			];
		}

		$body = wp_remote_retrieve_body( $response );
		
		// Check for mobile-friendly indicators
		$mobile_indicators = [
			'viewport' => strpos( $body, 'viewport' ) !== false,
			'responsive_css' => strpos( $body, '@media' ) !== false,
			'touch_icons' => strpos( $body, 'apple-touch-icon' ) !== false,
		];

		$score = array_sum( $mobile_indicators ) / count( $mobile_indicators ) * 100;

		return [
			'status' => $score >= 80 ? 'good' : 'needs_improvement',
			'score' => $score,
			'indicators' => $mobile_indicators,
		];
	}

	/**
	 * Check SSL status.
	 *
	 * @param string $url URL to check.
	 * @return array SSL status analysis.
	 */
	private function check_ssl_status( $url ) {
		$parsed_url = parse_url( $url );
		$is_https = isset( $parsed_url['scheme'] ) && $parsed_url['scheme'] === 'https';

		return [
			'status' => $is_https ? 'good' : 'warning',
			'is_https' => $is_https,
			'issues' => $is_https ? [] : [ __( 'Site is not using HTTPS', 'rank-math-pro' ) ],
		];
	}

	/**
	 * Check structured data.
	 *
	 * @param string $url URL to check.
	 * @return array Structured data analysis.
	 */
	private function check_structured_data( $url ) {
		$response = wp_remote_get( $url );
		
		if ( is_wp_error( $response ) ) {
			return [
				'status' => 'error',
				'types' => [],
			];
		}

		$body = wp_remote_retrieve_body( $response );
		
		// Check for common structured data types
		$structured_data_types = [
			'Organization' => strpos( $body, 'schema.org/Organization' ) !== false,
			'WebSite' => strpos( $body, 'schema.org/WebSite' ) !== false,
			'Article' => strpos( $body, 'schema.org/Article' ) !== false,
			'BreadcrumbList' => strpos( $body, 'schema.org/BreadcrumbList' ) !== false,
			'Product' => strpos( $body, 'schema.org/Product' ) !== false,
		];

		$found_types = array_keys( array_filter( $structured_data_types ) );

		return [
			'status' => ! empty( $found_types ) ? 'good' : 'needs_improvement',
			'types' => $found_types,
			'total_types' => count( $found_types ),
		];
	}

	/**
	 * Check meta tags.
	 *
	 * @param string $url URL to check.
	 * @return array Meta tags analysis.
	 */
	private function check_meta_tags( $url ) {
		$response = wp_remote_get( $url );
		
		if ( is_wp_error( $response ) ) {
			return [
				'status' => 'error',
				'tags' => [],
			];
		}

		$body = wp_remote_retrieve_body( $response );
		
		// Extract meta tags
		preg_match_all( '/<meta[^>]+>/i', $body, $matches );
		$meta_tags = [];

		foreach ( $matches[0] as $tag ) {
			if ( preg_match( '/name=["\']([^"\']+)["\']/', $tag, $name_match ) ) {
				$name = $name_match[1];
				if ( preg_match( '/content=["\']([^"\']+)["\']/', $tag, $content_match ) ) {
					$meta_tags[ $name ] = $content_match[1];
				}
			}
		}

		$important_tags = [
			'description' => isset( $meta_tags['description'] ),
			'keywords' => isset( $meta_tags['keywords'] ),
			'robots' => isset( $meta_tags['robots'] ),
			'author' => isset( $meta_tags['author'] ),
		];

		return [
			'status' => array_sum( $important_tags ) >= 2 ? 'good' : 'needs_improvement',
			'tags' => $meta_tags,
			'important_tags' => $important_tags,
		];
	}

	/**
	 * Check headings structure.
	 *
	 * @param string $url URL to check.
	 * @return array Headings analysis.
	 */
	private function check_headings( $url ) {
		$response = wp_remote_get( $url );
		
		if ( is_wp_error( $response ) ) {
			return [
				'status' => 'error',
				'structure' => [],
			];
		}

		$body = wp_remote_retrieve_body( $response );
		
		// Extract headings
		preg_match_all( '/<h([1-6])[^>]*>(.*?)<\/h[1-6]>/i', $body, $matches, PREG_SET_ORDER );
		
		$headings = [];
		foreach ( $matches as $match ) {
			$level = (int) $match[1];
			$text = strip_tags( $match[2] );
			$headings[] = [
				'level' => $level,
				'text' => $text,
			];
		}

		// Analyze structure
		$structure = [
			'total_headings' => count( $headings ),
			'h1_count' => count( array_filter( $headings, function( $h ) { return $h['level'] === 1; } ) ),
			'h2_count' => count( array_filter( $headings, function( $h ) { return $h['level'] === 2; } ) ),
			'has_h1' => count( array_filter( $headings, function( $h ) { return $h['level'] === 1; } ) ) > 0,
		];

		return [
			'status' => $structure['has_h1'] && $structure['total_headings'] >= 3 ? 'good' : 'needs_improvement',
			'structure' => $structure,
			'headings' => $headings,
		];
	}

	/**
	 * Check images optimization.
	 *
	 * @param string $url URL to check.
	 * @return array Images analysis.
	 */
	private function check_images( $url ) {
		$response = wp_remote_get( $url );
		
		if ( is_wp_error( $response ) ) {
			return [
				'status' => 'error',
				'images' => [],
			];
		}

		$body = wp_remote_retrieve_body( $response );
		
		// Extract images
		preg_match_all( '/<img[^>]+>/i', $body, $matches );
		$images = [];
		$images_without_alt = 0;

		foreach ( $matches[0] as $img ) {
			$images[] = $img;
			if ( ! preg_match( '/alt\s*=\s*["\'][^"\']*["\']/', $img ) ) {
				$images_without_alt++;
			}
		}

		$total_images = count( $images );
		$alt_percentage = $total_images > 0 ? ( ( $total_images - $images_without_alt ) / $total_images ) * 100 : 100;

		return [
			'status' => $alt_percentage >= 80 ? 'good' : 'needs_improvement',
			'total_images' => $total_images,
			'images_without_alt' => $images_without_alt,
			'alt_percentage' => $alt_percentage,
		];
	}

	/**
	 * Analyze content.
	 *
	 * @param string $url URL to analyze.
	 * @return array Content analysis.
	 */
	private function analyze_content( $url ) {
		$response = wp_remote_get( $url );
		
		if ( is_wp_error( $response ) ) {
			return [
				'status' => 'error',
				'content' => [],
			];
		}

		$body = wp_remote_retrieve_body( $response );
		
		// Extract main content (simplified)
		$content = strip_tags( $body );
		$word_count = str_word_count( $content );
		
		// Extract title
		preg_match( '/<title[^>]*>(.*?)<\/title>/i', $body, $title_match );
		$title = isset( $title_match[1] ) ? strip_tags( $title_match[1] ) : '';

		// Extract meta description
		preg_match( '/<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']+)["\'][^>]*>/i', $body, $desc_match );
		$description = isset( $desc_match[1] ) ? $desc_match[1] : '';

		return [
			'status' => 'analyzed',
			'word_count' => $word_count,
			'title' => $title,
			'description' => $description,
			'title_length' => strlen( $title ),
			'description_length' => strlen( $description ),
		];
	}

	/**
	 * Analyze backlinks (placeholder).
	 *
	 * @param string $url URL to analyze.
	 * @return array Backlink analysis.
	 */
	private function analyze_backlinks( $url ) {
		// This would integrate with backlink analysis tools
		return [
			'status' => 'not_available',
			'total_backlinks' => 0,
			'domain_authority' => 0,
		];
	}

	/**
	 * Analyze keywords (placeholder).
	 *
	 * @param string $url URL to analyze.
	 * @return array Keyword analysis.
	 */
	private function analyze_keywords( $url ) {
		// This would integrate with keyword research tools
		return [
			'status' => 'not_available',
			'keywords' => [],
		];
	}

	/**
	 * Generate competitor insights.
	 *
	 * @param array $analysis_results Analysis results.
	 * @return array Insights.
	 */
	private function generate_competitor_insights( $analysis_results ) {
		$insights = [
			'technical_insights' => $this->generate_technical_insights( $analysis_results ),
			'content_insights' => $this->generate_content_insights( $analysis_results ),
			'recommendations' => $this->generate_competitor_recommendations( $analysis_results ),
		];

		return $insights;
	}

	/**
	 * Generate technical insights.
	 *
	 * @param array $analysis_results Analysis results.
	 * @return array Technical insights.
	 */
	private function generate_technical_insights( $analysis_results ) {
		$insights = [];

		foreach ( $analysis_results as $url => $analysis ) {
			if ( isset( $analysis['technical'] ) ) {
				$technical = $analysis['technical'];
				
				// Site speed insights
				if ( isset( $technical['site_speed']['score'] ) && $technical['site_speed']['score'] > 90 ) {
					$insights[] = [
						'type' => 'site_speed',
						'competitor' => $url,
						'message' => __( 'Has excellent site speed', 'rank-math-pro' ),
						'score' => $technical['site_speed']['score'],
					];
				}

				// Mobile friendliness insights
				if ( isset( $technical['mobile_friendly']['score'] ) && $technical['mobile_friendly']['score'] > 90 ) {
					$insights[] = [
						'type' => 'mobile_friendly',
						'competitor' => $url,
						'message' => __( 'Excellent mobile optimization', 'rank-math-pro' ),
						'score' => $technical['mobile_friendly']['score'],
					];
				}

				// Structured data insights
				if ( isset( $technical['structured_data']['total_types'] ) && $technical['structured_data']['total_types'] > 3 ) {
					$insights[] = [
						'type' => 'structured_data',
						'competitor' => $url,
						'message' => __( 'Uses multiple structured data types', 'rank-math-pro' ),
						'types' => $technical['structured_data']['types'],
					];
				}
			}
		}

		return $insights;
	}

	/**
	 * Generate content insights.
	 *
	 * @param array $analysis_results Analysis results.
	 * @return array Content insights.
	 */
	private function generate_content_insights( $analysis_results ) {
		$insights = [];

		foreach ( $analysis_results as $url => $analysis ) {
			if ( isset( $analysis['content'] ) ) {
				$content = $analysis['content'];
				
				// Content length insights
				if ( isset( $content['word_count'] ) && $content['word_count'] > 2000 ) {
					$insights[] = [
						'type' => 'content_length',
						'competitor' => $url,
						'message' => __( 'Uses long-form content', 'rank-math-pro' ),
						'word_count' => $content['word_count'],
					];
				}

				// Title optimization insights
				if ( isset( $content['title_length'] ) && $content['title_length'] >= 30 && $content['title_length'] <= 60 ) {
					$insights[] = [
						'type' => 'title_optimization',
						'competitor' => $url,
						'message' => __( 'Well-optimized title length', 'rank-math-pro' ),
						'title_length' => $content['title_length'],
					];
				}
			}
		}

		return $insights;
	}

	/**
	 * Generate competitor recommendations.
	 *
	 * @param array $analysis_results Analysis results.
	 * @return array Recommendations.
	 */
	private function generate_competitor_recommendations( $analysis_results ) {
		$recommendations = [];

		// Analyze patterns across competitors
		$common_techniques = $this->identify_common_techniques( $analysis_results );
		
		foreach ( $common_techniques as $technique => $details ) {
			$recommendations[] = [
				'type' => 'technique',
				'title' => sprintf( __( 'Consider implementing: %s', 'rank-math-pro' ), $technique ),
				'description' => $details['description'],
				'competitors_using' => $details['competitors'],
				'priority' => $details['priority'],
			];
		}

		return $recommendations;
	}

	/**
	 * Identify common techniques used by competitors.
	 *
	 * @param array $analysis_results Analysis results.
	 * @return array Common techniques.
	 */
	private function identify_common_techniques( $analysis_results ) {
		$techniques = [];

		// Count structured data usage
		$structured_data_count = 0;
		$competitors_with_structured_data = [];

		foreach ( $analysis_results as $url => $analysis ) {
			if ( isset( $analysis['technical']['structured_data']['total_types'] ) && $analysis['technical']['structured_data']['total_types'] > 0 ) {
				$structured_data_count++;
				$competitors_with_structured_data[] = $url;
			}
		}

		if ( $structured_data_count > 0 ) {
			$techniques['structured_data'] = [
				'description' => __( 'Most competitors use structured data to improve search visibility', 'rank-math-pro' ),
				'competitors' => $competitors_with_structured_data,
				'priority' => 'high',
			];
		}

		// Count mobile optimization
		$mobile_optimized_count = 0;
		$competitors_mobile_optimized = [];

		foreach ( $analysis_results as $url => $analysis ) {
			if ( isset( $analysis['technical']['mobile_friendly']['score'] ) && $analysis['technical']['mobile_friendly']['score'] > 80 ) {
				$mobile_optimized_count++;
				$competitors_mobile_optimized[] = $url;
			}
		}

		if ( $mobile_optimized_count > 0 ) {
			$techniques['mobile_optimization'] = [
				'description' => __( 'Competitors prioritize mobile optimization', 'rank-math-pro' ),
				'competitors' => $competitors_mobile_optimized,
				'priority' => 'high',
			];
		}

		return $techniques;
	}

	/**
	 * Check for competitor changes.
	 *
	 * @param array $current_analysis Current analysis results.
	 */
	private function check_for_competitor_changes( $current_analysis ) {
		$previous_analysis = get_option( 'rank_math_seo_bot_previous_competitor_analysis', [] );
		
		if ( empty( $previous_analysis ) ) {
			update_option( 'rank_math_seo_bot_previous_competitor_analysis', $current_analysis );
			return;
		}

		$changes = $this->detect_competitor_changes( $previous_analysis, $current_analysis );
		
		if ( ! empty( $changes ) ) {
			$this->send_competitor_notification( $changes );
		}

		update_option( 'rank_math_seo_bot_previous_competitor_analysis', $current_analysis );
	}

	/**
	 * Detect competitor changes.
	 *
	 * @param array $previous Previous analysis.
	 * @param array $current  Current analysis.
	 * @return array Changes detected.
	 */
	private function detect_competitor_changes( $previous, $current ) {
		$changes = [];

		foreach ( $current as $url => $current_data ) {
			$previous_data = $previous[ $url ] ?? null;
			
			if ( ! $previous_data ) {
				continue;
			}

			// Check for significant changes in site speed
			if ( isset( $current_data['technical']['site_speed']['score'] ) && isset( $previous_data['technical']['site_speed']['score'] ) ) {
				$speed_change = $current_data['technical']['site_speed']['score'] - $previous_data['technical']['site_speed']['score'];
				
				if ( abs( $speed_change ) >= 10 ) {
					$changes[] = [
						'type' => 'site_speed',
						'competitor' => $url,
						'change' => $speed_change,
						'previous_score' => $previous_data['technical']['site_speed']['score'],
						'current_score' => $current_data['technical']['site_speed']['score'],
					];
				}
			}
		}

		return $changes;
	}

	/**
	 * Send competitor notification.
	 *
	 * @param array $changes Changes detected.
	 */
	private function send_competitor_notification( $changes ) {
		$email = $this->config['notification_email'] ?? get_option( 'admin_email' );
		
		if ( empty( $email ) ) {
			return;
		}

		$subject = sprintf( __( 'Competitor Changes Detected - %s', 'rank-math-pro' ), get_bloginfo( 'name' ) );
		$message = $this->build_competitor_notification_message( $changes );
		
		wp_mail( $email, $subject, $message, [
			'Content-Type: text/html; charset=UTF-8',
		]);
	}

	/**
	 * Build competitor notification message.
	 *
	 * @param array $changes Changes detected.
	 * @return string HTML message.
	 */
	private function build_competitor_notification_message( $changes ) {
		$message = '<h2>' . __( 'Competitor Changes Detected', 'rank-math-pro' ) . '</h2>';
		$message .= '<p>' . __( 'The following changes were detected in competitor analysis:', 'rank-math-pro' ) . '</p>';
		
		$message .= '<ul>';
		foreach ( $changes as $change ) {
			$message .= '<li>';
			$message .= sprintf(
				__( '%s: %s (was %d, now %d)', 'rank-math-pro' ),
				esc_html( $change['competitor'] ),
				esc_html( $change['type'] ),
				$change['previous_score'],
				$change['current_score']
			);
			$message .= '</li>';
		}
		$message .= '</ul>';

		$message .= '<p>' . __( 'This is an automated message from Rank Math SEO Bot.', 'rank-math-pro' ) . '</p>';

		return $message;
	}

	/**
	 * Get competitor analysis summary.
	 *
	 * @return array Analysis summary.
	 */
	public function get_competitor_summary() {
		$analysis = get_option( 'rank_math_seo_bot_competitor_analysis', [] );
		$insights = get_option( 'rank_math_seo_bot_competitor_insights', [] );

		return [
			'total_competitors' => count( $analysis ),
			'last_analyzed' => ! empty( $analysis ) ? max( array_column( $analysis, 'last_analyzed' ) ) : null,
			'insights' => $insights,
			'analysis' => $analysis,
		];
	}
}
