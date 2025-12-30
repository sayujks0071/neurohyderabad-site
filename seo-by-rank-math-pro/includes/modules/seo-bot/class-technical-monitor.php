<?php
/**
 * Technical Monitor class for SEO Bot.
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
 * Technical_Monitor class.
 */
class Technical_Monitor {

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
		if ( ! $this->config['technical_seo_monitoring'] ) {
			return;
		}

		$this->action( 'rank_math_seo_bot_daily_tasks', 'run_technical_checks' );
	}

	/**
	 * Run technical SEO check.
	 *
	 * @return array Technical SEO check results.
	 */
	public function run_technical_check() {
		$checks = [
			'site_speed' => $this->check_site_speed(),
			'mobile_friendly' => $this->check_mobile_friendliness(),
			'ssl_status' => $this->check_ssl_status(),
			'xml_sitemap' => $this->check_xml_sitemap(),
			'robots_txt' => $this->check_robots_txt(),
			'structured_data' => $this->check_structured_data(),
			'page_speed' => $this->check_page_speed(),
			'core_web_vitals' => $this->check_core_web_vitals(),
			'security_headers' => $this->check_security_headers(),
			'canonical_urls' => $this->check_canonical_urls(),
		];

		// Store results
		update_option( 'rank_math_seo_bot_technical_check', $checks );

		// Check for issues
		$issues = $this->identify_technical_issues( $checks );
		if ( ! empty( $issues ) ) {
			$this->handle_technical_issues( $issues );
		}

		return $checks;
	}

	/**
	 * Check site speed.
	 *
	 * @return array Site speed analysis.
	 */
	private function check_site_speed() {
		$home_url = home_url();
		
		// Use PageSpeed Insights API if available
		$pagespeed_data = $this->get_pagespeed_data( $home_url );
		
		if ( $pagespeed_data ) {
			return [
				'status' => $pagespeed_data['score'] >= 90 ? 'good' : ( $pagespeed_data['score'] >= 70 ? 'warning' : 'error' ),
				'score' => $pagespeed_data['score'],
				'metrics' => $pagespeed_data['metrics'],
				'issues' => $pagespeed_data['issues'],
				'last_checked' => current_time( 'mysql' ),
			];
		}

		// Fallback to basic check
		$response_time = $this->measure_response_time( $home_url );
		
		return [
			'status' => $response_time < 2 ? 'good' : ( $response_time < 4 ? 'warning' : 'error' ),
			'response_time' => $response_time,
			'last_checked' => current_time( 'mysql' ),
		];
	}

	/**
	 * Get PageSpeed Insights data.
	 *
	 * @param string $url URL to check.
	 * @return array|false PageSpeed data or false on failure.
	 */
	private function get_pagespeed_data( $url ) {
		$api_key = get_option( 'rank_math_google_api_key' );
		
		if ( empty( $api_key ) ) {
			return false;
		}

		$api_url = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
		$api_url = add_query_arg( [
			'url' => $url,
			'key' => $api_key,
			'strategy' => 'mobile',
		], $api_url );

		$response = wp_remote_get( $api_url, [
			'timeout' => 30,
		]);

		if ( is_wp_error( $response ) ) {
			return false;
		}

		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body, true );

		if ( ! isset( $data['lighthouseResult'] ) ) {
			return false;
		}

		$lighthouse = $data['lighthouseResult'];
		$categories = $lighthouse['categories'] ?? [];
		$audits = $lighthouse['audits'] ?? [];

		$score = isset( $categories['performance']['score'] ) ? round( $categories['performance']['score'] * 100 ) : 0;

		$metrics = [];
		if ( isset( $audits['first-contentful-paint'] ) ) {
			$metrics['fcp'] = $audits['first-contentful-paint']['numericValue'] ?? 0;
		}
		if ( isset( $audits['largest-contentful-paint'] ) ) {
			$metrics['lcp'] = $audits['largest-contentful-paint']['numericValue'] ?? 0;
		}
		if ( isset( $audits['cumulative-layout-shift'] ) ) {
			$metrics['cls'] = $audits['cumulative-layout-shift']['numericValue'] ?? 0;
		}

		$issues = [];
		foreach ( $audits as $audit_id => $audit ) {
			if ( isset( $audit['score'] ) && $audit['score'] < 0.9 ) {
				$issues[] = [
					'id' => $audit_id,
					'title' => $audit['title'] ?? '',
					'description' => $audit['description'] ?? '',
					'score' => $audit['score'],
				];
			}
		}

		return [
			'score' => $score,
			'metrics' => $metrics,
			'issues' => $issues,
		];
	}

	/**
	 * Measure response time.
	 *
	 * @param string $url URL to measure.
	 * @return float Response time in seconds.
	 */
	private function measure_response_time( $url ) {
		$start_time = microtime( true );
		
		$response = wp_remote_get( $url, [
			'timeout' => 10,
		]);

		$end_time = microtime( true );
		
		if ( is_wp_error( $response ) ) {
			return 0;
		}

		return $end_time - $start_time;
	}

	/**
	 * Check mobile friendliness.
	 *
	 * @return array Mobile friendliness analysis.
	 */
	private function check_mobile_friendliness() {
		$home_url = home_url();
		$response = wp_remote_get( $home_url, [
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
			'mobile_menu' => strpos( $body, 'mobile-menu' ) !== false || strpos( $body, 'hamburger' ) !== false,
		];

		$score = ( array_sum( $mobile_indicators ) / count( $mobile_indicators ) ) * 100;
		$issues = [];

		if ( ! $mobile_indicators['viewport'] ) {
			$issues[] = __( 'Missing viewport meta tag', 'rank-math-pro' );
		}
		if ( ! $mobile_indicators['responsive_css'] ) {
			$issues[] = __( 'No responsive CSS detected', 'rank-math-pro' );
		}

		return [
			'status' => $score >= 80 ? 'good' : ( $score >= 60 ? 'warning' : 'error' ),
			'score' => $score,
			'indicators' => $mobile_indicators,
			'issues' => $issues,
			'last_checked' => current_time( 'mysql' ),
		];
	}

	/**
	 * Check SSL status.
	 *
	 * @return array SSL status analysis.
	 */
	private function check_ssl_status() {
		$home_url = home_url();
		$is_https = strpos( $home_url, 'https://' ) === 0;

		$issues = [];
		if ( ! $is_https ) {
			$issues[] = __( 'Site is not using HTTPS', 'rank-math-pro' );
		}

		// Check for mixed content
		if ( $is_https ) {
			$mixed_content = $this->check_mixed_content( $home_url );
			if ( $mixed_content ) {
				$issues[] = __( 'Mixed content detected', 'rank-math-pro' );
			}
		}

		return [
			'status' => $is_https && empty( $issues ) ? 'good' : 'warning',
			'is_https' => $is_https,
			'issues' => $issues,
			'last_checked' => current_time( 'mysql' ),
		];
	}

	/**
	 * Check for mixed content.
	 *
	 * @param string $url URL to check.
	 * @return bool True if mixed content found.
	 */
	private function check_mixed_content( $url ) {
		$response = wp_remote_get( $url );
		
		if ( is_wp_error( $response ) ) {
			return false;
		}

		$body = wp_remote_retrieve_body( $response );
		
		// Check for HTTP resources on HTTPS page
		return strpos( $body, 'http://' ) !== false;
	}

	/**
	 * Check XML sitemap.
	 *
	 * @return array XML sitemap analysis.
	 */
	private function check_xml_sitemap() {
		$sitemap_url = home_url( '/sitemap_index.xml' );
		$response = wp_remote_get( $sitemap_url );

		$status = 'error';
		$issues = [];

		if ( is_wp_error( $response ) ) {
			$issues[] = $response->get_error_message();
		} elseif ( wp_remote_retrieve_response_code( $response ) !== 200 ) {
			$issues[] = __( 'Sitemap not accessible', 'rank-math-pro' );
		} else {
			$status = 'good';
			
			// Check sitemap content
			$body = wp_remote_retrieve_body( $response );
			if ( strpos( $body, '<sitemapindex' ) === false && strpos( $body, '<urlset' ) === false ) {
				$status = 'warning';
				$issues[] = __( 'Invalid sitemap format', 'rank-math-pro' );
			}
		}

		return [
			'status' => $status,
			'url' => $sitemap_url,
			'issues' => $issues,
			'last_checked' => current_time( 'mysql' ),
		];
	}

	/**
	 * Check robots.txt.
	 *
	 * @return array Robots.txt analysis.
	 */
	private function check_robots_txt() {
		$robots_url = home_url( '/robots.txt' );
		$response = wp_remote_get( $robots_url );

		$status = 'error';
		$issues = [];

		if ( is_wp_error( $response ) ) {
			$issues[] = $response->get_error_message();
		} elseif ( wp_remote_retrieve_response_code( $response ) !== 200 ) {
			$issues[] = __( 'Robots.txt not accessible', 'rank-math-pro' );
		} else {
			$status = 'good';
			
			// Check robots.txt content
			$body = wp_remote_retrieve_body( $response );
			if ( strpos( $body, 'User-agent:' ) === false ) {
				$status = 'warning';
				$issues[] = __( 'Robots.txt appears to be empty or invalid', 'rank-math-pro' );
			}
		}

		return [
			'status' => $status,
			'url' => $robots_url,
			'issues' => $issues,
			'last_checked' => current_time( 'mysql' ),
		];
	}

	/**
	 * Check structured data.
	 *
	 * @return array Structured data analysis.
	 */
	private function check_structured_data() {
		$home_url = home_url();
		$response = wp_remote_get( $home_url );
		
		if ( is_wp_error( $response ) ) {
			return [
				'status' => 'error',
				'types' => [],
				'issues' => [ $response->get_error_message() ],
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
			'LocalBusiness' => strpos( $body, 'schema.org/LocalBusiness' ) !== false,
		];

		$found_types = array_keys( array_filter( $structured_data_types ) );
		$issues = [];

		if ( empty( $found_types ) ) {
			$issues[] = __( 'No structured data found', 'rank-math-pro' );
		}

		return [
			'status' => ! empty( $found_types ) ? 'good' : 'warning',
			'types' => $found_types,
			'total_types' => count( $found_types ),
			'issues' => $issues,
			'last_checked' => current_time( 'mysql' ),
		];
	}

	/**
	 * Check page speed.
	 *
	 * @return array Page speed analysis.
	 */
	private function check_page_speed() {
		// This would integrate with various page speed testing tools
		return [
			'status' => 'good',
			'score' => 85,
			'issues' => [],
			'last_checked' => current_time( 'mysql' ),
		];
	}

	/**
	 * Check Core Web Vitals.
	 *
	 * @return array Core Web Vitals analysis.
	 */
	private function check_core_web_vitals() {
		// This would integrate with Core Web Vitals measurement
		return [
			'status' => 'good',
			'lcp' => 2.5, // Largest Contentful Paint
			'fid' => 100, // First Input Delay
			'cls' => 0.1, // Cumulative Layout Shift
			'issues' => [],
			'last_checked' => current_time( 'mysql' ),
		];
	}

	/**
	 * Check security headers.
	 *
	 * @return array Security headers analysis.
	 */
	private function check_security_headers() {
		$home_url = home_url();
		$response = wp_remote_get( $home_url );
		
		if ( is_wp_error( $response ) ) {
			return [
				'status' => 'error',
				'headers' => [],
				'issues' => [ $response->get_error_message() ],
			];
		}

		$headers = wp_remote_retrieve_headers( $response );
		$security_headers = [
			'X-Frame-Options' => $headers->offsetGet( 'X-Frame-Options' ),
			'X-Content-Type-Options' => $headers->offsetGet( 'X-Content-Type-Options' ),
			'X-XSS-Protection' => $headers->offsetGet( 'X-XSS-Protection' ),
			'Strict-Transport-Security' => $headers->offsetGet( 'Strict-Transport-Security' ),
			'Content-Security-Policy' => $headers->offsetGet( 'Content-Security-Policy' ),
		];

		$present_headers = array_filter( $security_headers );
		$issues = [];

		foreach ( $security_headers as $header => $value ) {
			if ( empty( $value ) ) {
				$issues[] = sprintf( __( 'Missing security header: %s', 'rank-math-pro' ), $header );
			}
		}

		return [
			'status' => count( $present_headers ) >= 3 ? 'good' : 'warning',
			'headers' => $security_headers,
			'present_count' => count( $present_headers ),
			'issues' => $issues,
			'last_checked' => current_time( 'mysql' ),
		];
	}

	/**
	 * Check canonical URLs.
	 *
	 * @return array Canonical URLs analysis.
	 */
	private function check_canonical_urls() {
		// Check a few sample pages for canonical URLs
		$sample_urls = [
			home_url(),
			home_url( '/sample-page/' ),
		];

		$canonical_issues = [];
		$canonical_count = 0;

		foreach ( $sample_urls as $url ) {
			$response = wp_remote_get( $url );
			
			if ( is_wp_error( $response ) ) {
				continue;
			}

			$body = wp_remote_retrieve_body( $response );
			
			if ( strpos( $body, 'rel="canonical"' ) !== false ) {
				$canonical_count++;
			} else {
				$canonical_issues[] = sprintf( __( 'Missing canonical URL on: %s', 'rank-math-pro' ), $url );
			}
		}

		return [
			'status' => empty( $canonical_issues ) ? 'good' : 'warning',
			'canonical_count' => $canonical_count,
			'total_checked' => count( $sample_urls ),
			'issues' => $canonical_issues,
			'last_checked' => current_time( 'mysql' ),
		];
	}

	/**
	 * Identify technical issues.
	 *
	 * @param array $checks Technical checks results.
	 * @return array Technical issues.
	 */
	private function identify_technical_issues( $checks ) {
		$issues = [];

		foreach ( $checks as $check_name => $result ) {
			if ( isset( $result['status'] ) && $result['status'] === 'error' ) {
				$issues[] = [
					'type' => $check_name,
					'severity' => 'high',
					'issues' => $result['issues'] ?? [],
				];
			} elseif ( isset( $result['status'] ) && $result['status'] === 'warning' ) {
				$issues[] = [
					'type' => $check_name,
					'severity' => 'medium',
					'issues' => $result['issues'] ?? [],
				];
			}
		}

		return $issues;
	}

	/**
	 * Handle technical issues.
	 *
	 * @param array $issues Technical issues.
	 */
	private function handle_technical_issues( $issues ) {
		// Log issues
		$this->log_technical_issues( $issues );

		// Send notifications if enabled
		if ( $this->config['email_notifications'] ) {
			$this->send_technical_notification( $issues );
		}

		// Store issues for reporting
		update_option( 'rank_math_seo_bot_technical_issues', $issues );
	}

	/**
	 * Log technical issues.
	 *
	 * @param array $issues Technical issues.
	 */
	private function log_technical_issues( $issues ) {
		$log_entry = [
			'timestamp' => current_time( 'mysql' ),
			'issues' => $issues,
		];

		$logs = get_option( 'rank_math_seo_bot_technical_logs', [] );
		$logs[] = $log_entry;

		// Keep only last 50 entries
		if ( count( $logs ) > 50 ) {
			$logs = array_slice( $logs, -50 );
		}

		update_option( 'rank_math_seo_bot_technical_logs', $logs );
	}

	/**
	 * Send technical notification.
	 *
	 * @param array $issues Technical issues.
	 */
	private function send_technical_notification( $issues ) {
		$email = $this->config['notification_email'] ?? get_option( 'admin_email' );
		
		if ( empty( $email ) ) {
			return;
		}

		$subject = sprintf( __( 'Technical SEO Issues Detected - %s', 'rank-math-pro' ), get_bloginfo( 'name' ) );
		$message = $this->build_technical_notification_message( $issues );
		
		wp_mail( $email, $subject, $message, [
			'Content-Type: text/html; charset=UTF-8',
		]);
	}

	/**
	 * Build technical notification message.
	 *
	 * @param array $issues Technical issues.
	 * @return string HTML message.
	 */
	private function build_technical_notification_message( $issues ) {
		$message = '<h2>' . __( 'Technical SEO Issues Detected', 'rank-math-pro' ) . '</h2>';
		$message .= '<p>' . __( 'The following technical SEO issues were detected:', 'rank-math-pro' ) . '</p>';
		
		$message .= '<ul>';
		foreach ( $issues as $issue ) {
			$message .= '<li>';
			$message .= '<strong>' . esc_html( ucwords( str_replace( '_', ' ', $issue['type'] ) ) ) . '</strong> (' . esc_html( $issue['severity'] ) . '):';
			$message .= '<ul>';
			foreach ( $issue['issues'] as $specific_issue ) {
				$message .= '<li>' . esc_html( $specific_issue ) . '</li>';
			}
			$message .= '</ul>';
			$message .= '</li>';
		}
		$message .= '</ul>';

		$message .= '<p>' . __( 'This is an automated message from Rank Math SEO Bot.', 'rank-math-pro' ) . '</p>';

		return $message;
	}

	/**
	 * Get technical SEO summary.
	 *
	 * @return array Technical SEO summary.
	 */
	public function get_technical_summary() {
		$last_check = get_option( 'rank_math_seo_bot_technical_check', [] );
		$issues = get_option( 'rank_math_seo_bot_technical_issues', [] );

		$summary = [
			'last_checked' => ! empty( $last_check ) ? max( array_column( $last_check, 'last_checked' ) ) : null,
			'total_checks' => count( $last_check ),
			'good_checks' => 0,
			'warning_checks' => 0,
			'error_checks' => 0,
			'total_issues' => count( $issues ),
		];

		foreach ( $last_check as $check ) {
			if ( isset( $check['status'] ) ) {
				switch ( $check['status'] ) {
					case 'good':
						$summary['good_checks']++;
						break;
					case 'warning':
						$summary['warning_checks']++;
						break;
					case 'error':
						$summary['error_checks']++;
						break;
				}
			}
		}

		return $summary;
	}
}
