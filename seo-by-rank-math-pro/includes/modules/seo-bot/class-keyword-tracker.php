<?php
/**
 * Keyword Tracker class for SEO Bot.
 *
 * @since      3.0.99
 * @package    RankMathPro
 * @subpackage RankMathPro\SEO_Bot
 * @author     Rank Math <support@rankmath.com>
 */

namespace RankMathPro\SEO_Bot;

use RankMath\Helper;
use RankMath\Traits\Hooker;
use RankMath\Google\Console as GoogleConsole;

defined( 'ABSPATH' ) || exit;

/**
 * Keyword_Tracker class.
 */
class Keyword_Tracker {

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
		if ( ! $this->config['keyword_tracking'] ) {
			return;
		}

		$this->action( 'rank_math_seo_bot_daily_tasks', 'track_keywords' );
	}

	/**
	 * Track keywords.
	 *
	 * @return array Keyword tracking results.
	 */
	public function track_keywords() {
		$keywords = $this->config['priority_keywords'] ?? [];
		$tracking_results = [];

		foreach ( $keywords as $keyword ) {
			$tracking_results[ $keyword ] = $this->track_single_keyword( $keyword );
		}

		// Store tracking results
		update_option( 'rank_math_seo_bot_keyword_tracking', $tracking_results );

		// Analyze trends
		$trends = $this->analyze_keyword_trends( $tracking_results );
		update_option( 'rank_math_seo_bot_keyword_trends', $trends );

		// Check for significant changes
		$changes = $this->detect_keyword_changes( $tracking_results );
		if ( ! empty( $changes ) ) {
			$this->handle_keyword_changes( $changes );
		}

		return $tracking_results;
	}

	/**
	 * Track a single keyword.
	 *
	 * @param string $keyword Keyword to track.
	 * @return array Keyword tracking data.
	 */
	private function track_single_keyword( $keyword ) {
		$tracking_data = [
			'keyword' => $keyword,
			'position' => 0,
			'search_volume' => 0,
			'difficulty' => 0,
			'cpc' => 0,
			'competition' => 'unknown',
			'last_tracked' => current_time( 'mysql' ),
			'source' => 'manual',
		];

		// Try to get data from Google Search Console
		if ( GoogleConsole::is_console_connected() ) {
			$console_data = $this->get_console_keyword_data( $keyword );
			if ( $console_data ) {
				$tracking_data = array_merge( $tracking_data, $console_data );
				$tracking_data['source'] = 'search_console';
			}
		}

		// Get keyword research data
		$research_data = $this->get_keyword_research_data( $keyword );
		if ( $research_data ) {
			$tracking_data = array_merge( $tracking_data, $research_data );
		}

		// Manual ranking check if no console data
		if ( $tracking_data['position'] === 0 ) {
			$tracking_data['position'] = $this->manual_ranking_check( $keyword );
		}

		return $tracking_data;
	}

	/**
	 * Get keyword data from Google Search Console.
	 *
	 * @param string $keyword Keyword.
	 * @return array|false Console data or false on failure.
	 */
	private function get_console_keyword_data( $keyword ) {
		// This would integrate with Rank Math's Google Search Console integration
		// For now, return mock data
		return [
			'position' => rand( 1, 100 ),
			'impressions' => rand( 100, 10000 ),
			'clicks' => rand( 10, 1000 ),
			'ctr' => rand( 1, 20 ) / 100,
		];
	}

	/**
	 * Get keyword research data.
	 *
	 * @param string $keyword Keyword.
	 * @return array|false Research data or false on failure.
	 */
	private function get_keyword_research_data( $keyword ) {
		// This would integrate with keyword research APIs
		// For now, return mock data
		return [
			'search_volume' => rand( 100, 10000 ),
			'difficulty' => rand( 1, 100 ),
			'cpc' => rand( 1, 50 ) / 10,
			'competition' => $this->get_competition_level( rand( 1, 100 ) ),
		];
	}

	/**
	 * Get competition level based on score.
	 *
	 * @param int $score Competition score.
	 * @return string Competition level.
	 */
	private function get_competition_level( $score ) {
		if ( $score <= 30 ) {
			return 'low';
		} elseif ( $score <= 70 ) {
			return 'medium';
		} else {
			return 'high';
		}
	}

	/**
	 * Manual ranking check using search results.
	 *
	 * @param string $keyword Keyword to check.
	 * @return int Ranking position (0 if not found in top 100).
	 */
	private function manual_ranking_check( $keyword ) {
		$site_url = home_url();
		$search_url = 'https://www.google.com/search?q=' . urlencode( $keyword ) . '&num=100';

		// This is a simplified example - in reality, you'd need to handle
		// Google's anti-bot measures and use proper APIs
		$response = wp_remote_get( $search_url, [
			'user-agent' => 'Mozilla/5.0 (compatible; RankMathBot/1.0)',
			'timeout' => 30,
		]);

		if ( is_wp_error( $response ) ) {
			return 0;
		}

		$body = wp_remote_retrieve_body( $response );
		
		// Simple check for site URL in results
		if ( strpos( $body, $site_url ) !== false ) {
			// This is a very basic implementation
			// In reality, you'd need to parse the HTML properly
			return rand( 1, 50 ); // Mock position
		}

		return 0;
	}

	/**
	 * Analyze keyword trends.
	 *
	 * @param array $tracking_results Current tracking results.
	 * @return array Keyword trends.
	 */
	private function analyze_keyword_trends( $tracking_results ) {
		$previous_results = get_option( 'rank_math_seo_bot_previous_keyword_tracking', [] );
		
		if ( empty( $previous_results ) ) {
			update_option( 'rank_math_seo_bot_previous_keyword_tracking', $tracking_results );
			return [];
		}

		$trends = [];

		foreach ( $tracking_results as $keyword => $current_data ) {
			$previous_data = $previous_results[ $keyword ] ?? null;
			
			if ( ! $previous_data ) {
				continue;
			}

			$position_change = $current_data['position'] - $previous_data['position'];
			$impressions_change = ( $current_data['impressions'] ?? 0 ) - ( $previous_data['impressions'] ?? 0 );
			$clicks_change = ( $current_data['clicks'] ?? 0 ) - ( $previous_data['clicks'] ?? 0 );

			$trends[ $keyword ] = [
				'keyword' => $keyword,
				'position_change' => $position_change,
				'impressions_change' => $impressions_change,
				'clicks_change' => $clicks_change,
				'trend' => $this->determine_trend( $position_change, $impressions_change, $clicks_change ),
				'last_analyzed' => current_time( 'mysql' ),
			];
		}

		update_option( 'rank_math_seo_bot_previous_keyword_tracking', $tracking_results );

		return $trends;
	}

	/**
	 * Determine keyword trend.
	 *
	 * @param int $position_change Position change.
	 * @param int $impressions_change Impressions change.
	 * @param int $clicks_change Clicks change.
	 * @return string Trend.
	 */
	private function determine_trend( $position_change, $impressions_change, $clicks_change ) {
		$score = 0;

		// Position improvement (negative change is good)
		if ( $position_change < 0 ) {
			$score += 2;
		} elseif ( $position_change > 0 ) {
			$score -= 2;
		}

		// Impressions increase
		if ( $impressions_change > 0 ) {
			$score += 1;
		} elseif ( $impressions_change < 0 ) {
			$score -= 1;
		}

		// Clicks increase
		if ( $clicks_change > 0 ) {
			$score += 1;
		} elseif ( $clicks_change < 0 ) {
			$score -= 1;
		}

		if ( $score >= 2 ) {
			return 'improving';
		} elseif ( $score <= -2 ) {
			return 'declining';
		} else {
			return 'stable';
		}
	}

	/**
	 * Detect significant keyword changes.
	 *
	 * @param array $tracking_results Current tracking results.
	 * @return array Significant changes.
	 */
	private function detect_keyword_changes( $tracking_results ) {
		$previous_results = get_option( 'rank_math_seo_bot_previous_keyword_tracking', [] );
		$changes = [];

		foreach ( $tracking_results as $keyword => $current_data ) {
			$previous_data = $previous_results[ $keyword ] ?? null;
			
			if ( ! $previous_data ) {
				continue;
			}

			$position_change = $current_data['position'] - $previous_data['position'];
			
			// Only report significant changes (5+ positions)
			if ( abs( $position_change ) >= 5 ) {
				$changes[ $keyword ] = [
					'keyword' => $keyword,
					'previous_position' => $previous_data['position'],
					'current_position' => $current_data['position'],
					'change' => $position_change,
					'type' => $position_change < 0 ? 'improved' : 'dropped',
					'search_volume' => $current_data['search_volume'] ?? 0,
					'difficulty' => $current_data['difficulty'] ?? 0,
				];
			}
		}

		return $changes;
	}

	/**
	 * Handle keyword changes.
	 *
	 * @param array $changes Keyword changes.
	 */
	private function handle_keyword_changes( $changes ) {
		// Log changes
		$this->log_keyword_changes( $changes );

		// Send notifications if enabled
		if ( $this->config['email_notifications'] ) {
			$this->send_keyword_notification( $changes );
		}

		// Store changes for reporting
		$existing_changes = get_option( 'rank_math_seo_bot_keyword_changes', [] );
		$existing_changes[ current_time( 'Y-m-d' ) ] = $changes;
		update_option( 'rank_math_seo_bot_keyword_changes', $existing_changes );
	}

	/**
	 * Log keyword changes.
	 *
	 * @param array $changes Keyword changes.
	 */
	private function log_keyword_changes( $changes ) {
		$log_entry = [
			'timestamp' => current_time( 'mysql' ),
			'changes' => $changes,
		];

		$logs = get_option( 'rank_math_seo_bot_keyword_logs', [] );
		$logs[] = $log_entry;

		// Keep only last 100 entries
		if ( count( $logs ) > 100 ) {
			$logs = array_slice( $logs, -100 );
		}

		update_option( 'rank_math_seo_bot_keyword_logs', $logs );
	}

	/**
	 * Send keyword notification.
	 *
	 * @param array $changes Keyword changes.
	 */
	private function send_keyword_notification( $changes ) {
		$email = $this->config['notification_email'] ?? get_option( 'admin_email' );
		
		if ( empty( $email ) ) {
			return;
		}

		$subject = sprintf( __( 'Keyword Changes Detected - %s', 'rank-math-pro' ), get_bloginfo( 'name' ) );
		$message = $this->build_keyword_notification_message( $changes );
		
		wp_mail( $email, $subject, $message, [
			'Content-Type: text/html; charset=UTF-8',
		]);
	}

	/**
	 * Build keyword notification message.
	 *
	 * @param array $changes Keyword changes.
	 * @return string HTML message.
	 */
	private function build_keyword_notification_message( $changes ) {
		$message = '<h2>' . __( 'Keyword Changes Detected', 'rank-math-pro' ) . '</h2>';
		$message .= '<p>' . __( 'The following keyword changes were detected:', 'rank-math-pro' ) . '</p>';
		
		$message .= '<table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">';
		$message .= '<tr>';
		$message .= '<th>' . __( 'Keyword', 'rank-math-pro' ) . '</th>';
		$message .= '<th>' . __( 'Previous Position', 'rank-math-pro' ) . '</th>';
		$message .= '<th>' . __( 'Current Position', 'rank-math-pro' ) . '</th>';
		$message .= '<th>' . __( 'Change', 'rank-math-pro' ) . '</th>';
		$message .= '<th>' . __( 'Search Volume', 'rank-math-pro' ) . '</th>';
		$message .= '<th>' . __( 'Difficulty', 'rank-math-pro' ) . '</th>';
		$message .= '<th>' . __( 'Status', 'rank-math-pro' ) . '</th>';
		$message .= '</tr>';

		foreach ( $changes as $change ) {
			$status_color = $change['type'] === 'improved' ? 'green' : 'red';
			$status_text = $change['type'] === 'improved' ? __( 'Improved', 'rank-math-pro' ) : __( 'Dropped', 'rank-math-pro' );
			
			$message .= '<tr>';
			$message .= '<td>' . esc_html( $change['keyword'] ) . '</td>';
			$message .= '<td>' . esc_html( $change['previous_position'] ) . '</td>';
			$message .= '<td>' . esc_html( $change['current_position'] ) . '</td>';
			$message .= '<td>' . esc_html( $change['change'] ) . '</td>';
			$message .= '<td>' . esc_html( number_format( $change['search_volume'] ) ) . '</td>';
			$message .= '<td>' . esc_html( $change['difficulty'] ) . '</td>';
			$message .= '<td style="color: ' . $status_color . ';">' . esc_html( $status_text ) . '</td>';
			$message .= '</tr>';
		}

		$message .= '</table>';
		$message .= '<p>' . __( 'This is an automated message from Rank Math SEO Bot.', 'rank-math-pro' ) . '</p>';

		return $message;
	}

	/**
	 * Get keyword tracking summary.
	 *
	 * @return array Keyword tracking summary.
	 */
	public function get_keyword_summary() {
		$tracking_results = get_option( 'rank_math_seo_bot_keyword_tracking', [] );
		$trends = get_option( 'rank_math_seo_bot_keyword_trends', [] );

		$summary = [
			'total_keywords' => count( $tracking_results ),
			'improving_keywords' => 0,
			'declining_keywords' => 0,
			'stable_keywords' => 0,
			'average_position' => 0,
			'total_search_volume' => 0,
			'last_tracked' => null,
		];

		$total_position = 0;
		$positioned_keywords = 0;

		foreach ( $tracking_results as $keyword => $data ) {
			if ( $data['position'] > 0 ) {
				$total_position += $data['position'];
				$positioned_keywords++;
			}

			$summary['total_search_volume'] += $data['search_volume'] ?? 0;

			if ( ! empty( $data['last_tracked'] ) ) {
				if ( ! $summary['last_tracked'] || $data['last_tracked'] > $summary['last_tracked'] ) {
					$summary['last_tracked'] = $data['last_tracked'];
				}
			}
		}

		if ( $positioned_keywords > 0 ) {
			$summary['average_position'] = round( $total_position / $positioned_keywords, 1 );
		}

		foreach ( $trends as $trend ) {
			switch ( $trend['trend'] ) {
				case 'improving':
					$summary['improving_keywords']++;
					break;
				case 'declining':
					$summary['declining_keywords']++;
					break;
				case 'stable':
					$summary['stable_keywords']++;
					break;
			}
		}

		return $summary;
	}

	/**
	 * Get top performing keywords.
	 *
	 * @param int $limit Number of keywords to return.
	 * @return array Top performing keywords.
	 */
	public function get_top_performing_keywords( $limit = 10 ) {
		$tracking_results = get_option( 'rank_math_seo_bot_keyword_tracking', [] );
		
		// Filter keywords with positions
		$positioned_keywords = array_filter( $tracking_results, function( $data ) {
			return $data['position'] > 0;
		});

		// Sort by position (ascending)
		uasort( $positioned_keywords, function( $a, $b ) {
			return $a['position'] - $b['position'];
		});

		return array_slice( $positioned_keywords, 0, $limit, true );
	}

	/**
	 * Get keywords that need attention.
	 *
	 * @return array Keywords needing attention.
	 */
	public function get_keywords_needing_attention() {
		$tracking_results = get_option( 'rank_math_seo_bot_keyword_tracking', [] );
		$attention_keywords = [];

		foreach ( $tracking_results as $keyword => $data ) {
			// Keywords not ranking in top 50
			if ( $data['position'] === 0 || $data['position'] > 50 ) {
				$attention_keywords[] = [
					'keyword' => $keyword,
					'position' => $data['position'],
					'search_volume' => $data['search_volume'] ?? 0,
					'difficulty' => $data['difficulty'] ?? 0,
					'reason' => $data['position'] === 0 ? __( 'Not ranking', 'rank-math-pro' ) : __( 'Low ranking', 'rank-math-pro' ),
				];
			}
		}

		// Sort by search volume (descending)
		usort( $attention_keywords, function( $a, $b ) {
			return $b['search_volume'] - $a['search_volume'];
		});

		return $attention_keywords;
	}

	/**
	 * Get keyword trends for a specific keyword.
	 *
	 * @param string $keyword Keyword.
	 * @param int    $days    Number of days to analyze.
	 * @return array Keyword trends.
	 */
	public function get_keyword_trends( $keyword, $days = 30 ) {
		$logs = get_option( 'rank_math_seo_bot_keyword_logs', [] );
		$trends = [];

		$cutoff_date = date( 'Y-m-d', strtotime( "-{$days} days" ) );

		foreach ( $logs as $log ) {
			if ( $log['timestamp'] < $cutoff_date ) {
				continue;
			}

			if ( isset( $log['changes'][ $keyword ] ) ) {
				$trends[] = [
					'date' => $log['timestamp'],
					'position' => $log['changes'][ $keyword ]['current_position'],
					'change' => $log['changes'][ $keyword ]['change'],
				];
			}
		}

		return $trends;
	}
}
