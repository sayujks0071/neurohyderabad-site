<?php
/**
 * Ranking Monitor class for SEO Bot.
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
 * Ranking_Monitor class.
 */
class Ranking_Monitor {

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
		if ( ! $this->config['monitor_rankings'] ) {
			return;
		}

		$this->action( 'rank_math_seo_bot_daily_tasks', 'check_rankings' );
		$this->action( 'rank_math/analytics/updated', 'analyze_ranking_changes' );
	}

	/**
	 * Check rankings for priority keywords.
	 *
	 * @return array Ranking data.
	 */
	public function check_rankings() {
		$keywords = $this->config['priority_keywords'] ?? [];
		$rankings = [];

		foreach ( $keywords as $keyword ) {
			$rankings[ $keyword ] = $this->get_keyword_ranking( $keyword );
		}

		// Store current rankings
		$previous_rankings = get_option( 'rank_math_seo_bot_previous_rankings', [] );
		update_option( 'rank_math_seo_bot_previous_rankings', $rankings );

		// Check for changes
		$changes = $this->detect_ranking_changes( $previous_rankings, $rankings );
		if ( ! empty( $changes ) ) {
			$this->handle_ranking_changes( $changes );
		}

		update_option( 'rank_math_seo_bot_current_rankings', $rankings );

		return $rankings;
	}

	/**
	 * Get ranking for a specific keyword.
	 *
	 * @param string $keyword Keyword to check.
	 * @return array Keyword ranking data.
	 */
	private function get_keyword_ranking( $keyword ) {
		$ranking_data = [
			'keyword' => $keyword,
			'position' => 0,
			'change' => 0,
			'last_checked' => current_time( 'mysql' ),
			'url' => '',
			'impressions' => 0,
			'clicks' => 0,
			'ctr' => 0,
		];

		// Try to get data from Google Search Console
		if ( GoogleConsole::is_console_connected() ) {
			$console_data = $this->get_console_data( $keyword );
			if ( $console_data ) {
				$ranking_data = array_merge( $ranking_data, $console_data );
			}
		}

		// Fallback to manual ranking check
		if ( $ranking_data['position'] === 0 ) {
			$ranking_data['position'] = $this->manual_ranking_check( $keyword );
		}

		return $ranking_data;
	}

	/**
	 * Get data from Google Search Console.
	 *
	 * @param string $keyword Keyword.
	 * @return array|false Console data or false on failure.
	 */
	private function get_console_data( $keyword ) {
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
	 * Detect ranking changes.
	 *
	 * @param array $previous Previous rankings.
	 * @param array $current  Current rankings.
	 * @return array Changes detected.
	 */
	private function detect_ranking_changes( $previous, $current ) {
		$changes = [];

		foreach ( $current as $keyword => $current_data ) {
			$previous_data = $previous[ $keyword ] ?? null;
			
			if ( ! $previous_data ) {
				continue;
			}

			$position_change = $current_data['position'] - $previous_data['position'];
			
			// Only report significant changes
			if ( abs( $position_change ) >= 5 ) {
				$changes[ $keyword ] = [
					'keyword' => $keyword,
					'previous_position' => $previous_data['position'],
					'current_position' => $current_data['position'],
					'change' => $position_change,
					'type' => $position_change > 0 ? 'dropped' : 'improved',
					'url' => $current_data['url'],
				];
			}
		}

		return $changes;
	}

	/**
	 * Handle ranking changes.
	 *
	 * @param array $changes Ranking changes.
	 */
	private function handle_ranking_changes( $changes ) {
		// Log changes
		$this->log_ranking_changes( $changes );

		// Send notifications if enabled
		if ( $this->config['email_notifications'] ) {
			$this->send_ranking_notification( $changes );
		}

		// Store changes for reporting
		$existing_changes = get_option( 'rank_math_seo_bot_ranking_changes', [] );
		$existing_changes[ current_time( 'Y-m-d' ) ] = $changes;
		update_option( 'rank_math_seo_bot_ranking_changes', $existing_changes );
	}

	/**
	 * Log ranking changes.
	 *
	 * @param array $changes Ranking changes.
	 */
	private function log_ranking_changes( $changes ) {
		$log_entry = [
			'timestamp' => current_time( 'mysql' ),
			'changes' => $changes,
		];

		$logs = get_option( 'rank_math_seo_bot_ranking_logs', [] );
		$logs[] = $log_entry;

		// Keep only last 100 entries
		if ( count( $logs ) > 100 ) {
			$logs = array_slice( $logs, -100 );
		}

		update_option( 'rank_math_seo_bot_ranking_logs', $logs );
	}

	/**
	 * Send ranking notification email.
	 *
	 * @param array $changes Ranking changes.
	 */
	private function send_ranking_notification( $changes ) {
		$email = $this->config['notification_email'] ?? get_option( 'admin_email' );
		
		if ( empty( $email ) ) {
			return;
		}

		$subject = sprintf( __( 'Ranking Changes Detected - %s', 'rank-math-pro' ), get_bloginfo( 'name' ) );
		
		$message = $this->build_ranking_notification_message( $changes );
		
		wp_mail( $email, $subject, $message, [
			'Content-Type: text/html; charset=UTF-8',
		]);
	}

	/**
	 * Build ranking notification message.
	 *
	 * @param array $changes Ranking changes.
	 * @return string HTML message.
	 */
	private function build_ranking_notification_message( $changes ) {
		$message = '<h2>' . __( 'Ranking Changes Detected', 'rank-math-pro' ) . '</h2>';
		$message .= '<p>' . __( 'The following ranking changes were detected:', 'rank-math-pro' ) . '</p>';
		
		$message .= '<table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">';
		$message .= '<tr>';
		$message .= '<th>' . __( 'Keyword', 'rank-math-pro' ) . '</th>';
		$message .= '<th>' . __( 'Previous Position', 'rank-math-pro' ) . '</th>';
		$message .= '<th>' . __( 'Current Position', 'rank-math-pro' ) . '</th>';
		$message .= '<th>' . __( 'Change', 'rank-math-pro' ) . '</th>';
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
			$message .= '<td style="color: ' . $status_color . ';">' . esc_html( $status_text ) . '</td>';
			$message .= '</tr>';
		}

		$message .= '</table>';
		$message .= '<p>' . __( 'This is an automated message from Rank Math SEO Bot.', 'rank-math-pro' ) . '</p>';

		return $message;
	}

	/**
	 * Analyze ranking changes from analytics data.
	 *
	 * @param array $analytics Analytics data.
	 */
	public function analyze_ranking_changes( $analytics ) {
		if ( ! $this->config['monitor_rankings'] ) {
			return;
		}

		// Extract ranking data from analytics
		$ranking_data = $this->extract_ranking_data( $analytics );
		
		if ( ! empty( $ranking_data ) ) {
			$this->update_rankings_from_analytics( $ranking_data );
		}
	}

	/**
	 * Extract ranking data from analytics.
	 *
	 * @param array $analytics Analytics data.
	 * @return array Ranking data.
	 */
	private function extract_ranking_data( $analytics ) {
		$ranking_data = [];

		// This would extract ranking information from Rank Math Analytics data
		// For now, return empty array
		return $ranking_data;
	}

	/**
	 * Update rankings from analytics data.
	 *
	 * @param array $ranking_data Ranking data from analytics.
	 */
	private function update_rankings_from_analytics( $ranking_data ) {
		$current_rankings = get_option( 'rank_math_seo_bot_current_rankings', [] );
		
		foreach ( $ranking_data as $keyword => $data ) {
			if ( isset( $current_rankings[ $keyword ] ) ) {
				$current_rankings[ $keyword ] = array_merge( $current_rankings[ $keyword ], $data );
			}
		}

		update_option( 'rank_math_seo_bot_current_rankings', $current_rankings );
	}

	/**
	 * Get ranking trends for a keyword.
	 *
	 * @param string $keyword Keyword.
	 * @param int    $days    Number of days to analyze.
	 * @return array Ranking trends.
	 */
	public function get_ranking_trends( $keyword, $days = 30 ) {
		$logs = get_option( 'rank_math_seo_bot_ranking_logs', [] );
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
				];
			}
		}

		return $trends;
	}

	/**
	 * Get ranking summary.
	 *
	 * @return array Ranking summary.
	 */
	public function get_ranking_summary() {
		$current_rankings = get_option( 'rank_math_seo_bot_current_rankings', [] );
		$previous_rankings = get_option( 'rank_math_seo_bot_previous_rankings', [] );
		
		$summary = [
			'total_keywords' => count( $current_rankings ),
			'improved' => 0,
			'dropped' => 0,
			'unchanged' => 0,
			'average_position' => 0,
		];

		$total_position = 0;
		$positioned_keywords = 0;

		foreach ( $current_rankings as $keyword => $current_data ) {
			$previous_data = $previous_rankings[ $keyword ] ?? null;
			
			if ( $current_data['position'] > 0 ) {
				$total_position += $current_data['position'];
				$positioned_keywords++;
			}

			if ( $previous_data ) {
				$change = $current_data['position'] - $previous_data['position'];
				
				if ( $change < 0 ) {
					$summary['improved']++;
				} elseif ( $change > 0 ) {
					$summary['dropped']++;
				} else {
					$summary['unchanged']++;
				}
			}
		}

		if ( $positioned_keywords > 0 ) {
			$summary['average_position'] = round( $total_position / $positioned_keywords, 1 );
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
		$current_rankings = get_option( 'rank_math_seo_bot_current_rankings', [] );
		
		// Filter keywords with positions
		$positioned_keywords = array_filter( $current_rankings, function( $data ) {
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
		$current_rankings = get_option( 'rank_math_seo_bot_current_rankings', [] );
		$attention_keywords = [];

		foreach ( $current_rankings as $keyword => $data ) {
			// Keywords not ranking in top 50
			if ( $data['position'] === 0 || $data['position'] > 50 ) {
				$attention_keywords[] = [
					'keyword' => $keyword,
					'position' => $data['position'],
					'reason' => $data['position'] === 0 ? __( 'Not ranking', 'rank-math-pro' ) : __( 'Low ranking', 'rank-math-pro' ),
				];
			}
		}

		return $attention_keywords;
	}
}
