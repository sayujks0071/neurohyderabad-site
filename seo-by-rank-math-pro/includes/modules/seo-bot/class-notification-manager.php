<?php
/**
 * Notification Manager class for SEO Bot.
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
 * Notification_Manager class.
 */
class Notification_Manager {

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
		if ( ! $this->config['email_notifications'] ) {
			return;
		}

		$this->action( 'rank_math_seo_bot_weekly_tasks', 'send_weekly_report' );
		$this->action( 'rank_math_seo_bot_monthly_tasks', 'send_monthly_report' );
	}

	/**
	 * Send weekly report.
	 */
	public function send_weekly_report() {
		$report_data = $this->generate_weekly_report_data();
		$this->send_email_report( 'weekly', $report_data );
	}

	/**
	 * Send monthly report.
	 */
	public function send_monthly_report() {
		$report_data = $this->generate_monthly_report_data();
		$this->send_email_report( 'monthly', $report_data );
	}

	/**
	 * Send ranking change notification.
	 *
	 * @param array $changes Ranking changes.
	 */
	public function send_ranking_notification( $changes ) {
		if ( ! $this->config['email_notifications'] ) {
			return;
		}

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
	 * Send competitor change notification.
	 *
	 * @param array $changes Competitor changes.
	 */
	public function send_competitor_notification( $changes ) {
		if ( ! $this->config['email_notifications'] ) {
			return;
		}

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
	 * Send technical SEO notification.
	 *
	 * @param array $issues Technical issues.
	 */
	public function send_technical_notification( $issues ) {
		if ( ! $this->config['email_notifications'] ) {
			return;
		}

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
	 * Send custom notification.
	 *
	 * @param string $type Notification type.
	 * @param string $subject Email subject.
	 * @param string $message Email message.
	 * @param array  $data Additional data.
	 */
	public function send_custom_notification( $type, $subject, $message, $data = [] ) {
		if ( ! $this->config['email_notifications'] ) {
			return;
		}

		$email = $this->config['notification_email'] ?? get_option( 'admin_email' );
		
		if ( empty( $email ) ) {
			return;
		}

		$full_subject = sprintf( '%s - %s', $subject, get_bloginfo( 'name' ) );
		$full_message = $this->build_custom_notification_message( $message, $data );
		
		wp_mail( $email, $full_subject, $full_message, [
			'Content-Type: text/html; charset=UTF-8',
		]);
	}

	/**
	 * Generate weekly report data.
	 *
	 * @return array Weekly report data.
	 */
	private function generate_weekly_report_data() {
		$current_rankings = get_option( 'rank_math_seo_bot_current_rankings', [] );
		$previous_rankings = get_option( 'rank_math_seo_bot_previous_rankings', [] );
		$last_analysis = get_option( 'rank_math_seo_bot_last_analysis', [] );
		$competitor_summary = get_option( 'rank_math_seo_bot_competitor_summary', [] );

		// Calculate ranking changes
		$ranking_changes = $this->calculate_ranking_changes( $previous_rankings, $current_rankings );

		// Get content analysis summary
		$content_summary = $this->get_content_summary( $last_analysis );

		// Get technical SEO summary
		$technical_summary = $this->get_technical_summary();

		return [
			'period' => 'weekly',
			'date_range' => [
				'start' => date( 'Y-m-d', strtotime( '-7 days' ) ),
				'end' => date( 'Y-m-d' ),
			],
			'ranking_changes' => $ranking_changes,
			'content_summary' => $content_summary,
			'technical_summary' => $technical_summary,
			'competitor_summary' => $competitor_summary,
		];
	}

	/**
	 * Generate monthly report data.
	 *
	 * @return array Monthly report data.
	 */
	private function generate_monthly_report_data() {
		$weekly_data = $this->generate_weekly_report_data();
		$weekly_data['period'] = 'monthly';
		$weekly_data['date_range'] = [
			'start' => date( 'Y-m-d', strtotime( '-30 days' ) ),
			'end' => date( 'Y-m-d' ),
		];

		// Add monthly-specific data
		$weekly_data['monthly_insights'] = $this->generate_monthly_insights();
		$weekly_data['trends'] = $this->generate_trends_data();

		return $weekly_data;
	}

	/**
	 * Calculate ranking changes.
	 *
	 * @param array $previous Previous rankings.
	 * @param array $current  Current rankings.
	 * @return array Ranking changes.
	 */
	private function calculate_ranking_changes( $previous, $current ) {
		$changes = [
			'improved' => 0,
			'dropped' => 0,
			'unchanged' => 0,
			'total_keywords' => count( $current ),
		];

		foreach ( $current as $keyword => $current_data ) {
			$previous_data = $previous[ $keyword ] ?? null;
			
			if ( ! $previous_data ) {
				continue;
			}

			$position_change = $current_data['position'] - $previous_data['position'];
			
			if ( $position_change < 0 ) {
				$changes['improved']++;
			} elseif ( $position_change > 0 ) {
				$changes['dropped']++;
			} else {
				$changes['unchanged']++;
			}
		}

		return $changes;
	}

	/**
	 * Get content summary.
	 *
	 * @param array $analysis Analysis data.
	 * @return array Content summary.
	 */
	private function get_content_summary( $analysis ) {
		if ( empty( $analysis['content_analysis'] ) ) {
			return [
				'total_posts' => 0,
				'optimized_posts' => 0,
				'needs_optimization' => 0,
			];
		}

		$content_analysis = $analysis['content_analysis'];
		
		return [
			'total_posts' => $content_analysis['total_posts'] ?? 0,
			'optimized_posts' => $content_analysis['optimized_posts'] ?? 0,
			'needs_optimization' => count( $content_analysis['needs_optimization'] ?? [] ),
		];
	}

	/**
	 * Get technical summary.
	 *
	 * @return array Technical summary.
	 */
	private function get_technical_summary() {
		$technical_check = get_option( 'rank_math_seo_bot_technical_check', [] );
		$technical_issues = get_option( 'rank_math_seo_bot_technical_issues', [] );

		$summary = [
			'total_checks' => count( $technical_check ),
			'good_checks' => 0,
			'warning_checks' => 0,
			'error_checks' => 0,
			'total_issues' => count( $technical_issues ),
		];

		foreach ( $technical_check as $check ) {
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

	/**
	 * Generate monthly insights.
	 *
	 * @return array Monthly insights.
	 */
	private function generate_monthly_insights() {
		// This would analyze trends over the past month
		return [
			'top_improving_keywords' => [],
			'top_dropping_keywords' => [],
			'content_performance' => [],
			'technical_improvements' => [],
		];
	}

	/**
	 * Generate trends data.
	 *
	 * @return array Trends data.
	 */
	private function generate_trends_data() {
		// This would analyze trends over time
		return [
			'ranking_trend' => 'improving',
			'content_trend' => 'stable',
			'technical_trend' => 'improving',
		];
	}

	/**
	 * Send email report.
	 *
	 * @param string $type Report type.
	 * @param array  $data Report data.
	 */
	private function send_email_report( $type, $data ) {
		$email = $this->config['notification_email'] ?? get_option( 'admin_email' );
		
		if ( empty( $email ) ) {
			return;
		}

		$subject = sprintf( __( '%s SEO Report - %s', 'rank-math-pro' ), ucfirst( $type ), get_bloginfo( 'name' ) );
		$message = $this->build_report_message( $type, $data );
		
		wp_mail( $email, $subject, $message, [
			'Content-Type: text/html; charset=UTF-8',
		]);
	}

	/**
	 * Build report message.
	 *
	 * @param string $type Report type.
	 * @param array  $data Report data.
	 * @return string HTML message.
	 */
	private function build_report_message( $type, $data ) {
		$message = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">';
		$message .= '<h2 style="color: #0073aa;">' . sprintf( __( '%s SEO Report', 'rank-math-pro' ), ucfirst( $type ) ) . '</h2>';
		$message .= '<p>' . sprintf( __( 'Report for %s to %s', 'rank-math-pro' ), $data['date_range']['start'], $data['date_range']['end'] ) . '</p>';

		// Ranking changes
		if ( ! empty( $data['ranking_changes'] ) ) {
			$message .= '<h3 style="color: #23282d;">' . __( 'Ranking Changes', 'rank-math-pro' ) . '</h3>';
			$message .= '<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">';
			$message .= '<tr style="background: #f8f9fa;">';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd;">' . __( 'Total Keywords', 'rank-math-pro' ) . '</td>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd;">' . $data['ranking_changes']['total_keywords'] . '</td>';
			$message .= '</tr>';
			$message .= '<tr>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd;">' . __( 'Improved', 'rank-math-pro' ) . '</td>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd; color: #46b450;">' . $data['ranking_changes']['improved'] . '</td>';
			$message .= '</tr>';
			$message .= '<tr>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd;">' . __( 'Dropped', 'rank-math-pro' ) . '</td>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd; color: #dc3232;">' . $data['ranking_changes']['dropped'] . '</td>';
			$message .= '</tr>';
			$message .= '<tr>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd;">' . __( 'Unchanged', 'rank-math-pro' ) . '</td>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd;">' . $data['ranking_changes']['unchanged'] . '</td>';
			$message .= '</tr>';
			$message .= '</table>';
		}

		// Content summary
		if ( ! empty( $data['content_summary'] ) ) {
			$message .= '<h3 style="color: #23282d;">' . __( 'Content Analysis', 'rank-math-pro' ) . '</h3>';
			$message .= '<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">';
			$message .= '<tr style="background: #f8f9fa;">';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd;">' . __( 'Total Posts', 'rank-math-pro' ) . '</td>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd;">' . $data['content_summary']['total_posts'] . '</td>';
			$message .= '</tr>';
			$message .= '<tr>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd;">' . __( 'Optimized Posts', 'rank-math-pro' ) . '</td>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd; color: #46b450;">' . $data['content_summary']['optimized_posts'] . '</td>';
			$message .= '</tr>';
			$message .= '<tr>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd;">' . __( 'Need Optimization', 'rank-math-pro' ) . '</td>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd; color: #ffb900;">' . $data['content_summary']['needs_optimization'] . '</td>';
			$message .= '</tr>';
			$message .= '</table>';
		}

		// Technical summary
		if ( ! empty( $data['technical_summary'] ) ) {
			$message .= '<h3 style="color: #23282d;">' . __( 'Technical SEO', 'rank-math-pro' ) . '</h3>';
			$message .= '<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">';
			$message .= '<tr style="background: #f8f9fa;">';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd;">' . __( 'Total Checks', 'rank-math-pro' ) . '</td>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd;">' . $data['technical_summary']['total_checks'] . '</td>';
			$message .= '</tr>';
			$message .= '<tr>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd;">' . __( 'Good Checks', 'rank-math-pro' ) . '</td>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd; color: #46b450;">' . $data['technical_summary']['good_checks'] . '</td>';
			$message .= '</tr>';
			$message .= '<tr>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd;">' . __( 'Warning Checks', 'rank-math-pro' ) . '</td>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd; color: #ffb900;">' . $data['technical_summary']['warning_checks'] . '</td>';
			$message .= '</tr>';
			$message .= '<tr>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd;">' . __( 'Error Checks', 'rank-math-pro' ) . '</td>';
			$message .= '<td style="padding: 10px; border: 1px solid #ddd; color: #dc3232;">' . $data['technical_summary']['error_checks'] . '</td>';
			$message .= '</tr>';
			$message .= '</table>';
		}

		$message .= '<p style="color: #666; font-size: 12px; margin-top: 30px;">';
		$message .= __( 'This is an automated report from Rank Math SEO Bot.', 'rank-math-pro' );
		$message .= '</p>';
		$message .= '</div>';

		return $message;
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
	 * Build competitor notification message.
	 *
	 * @param array $changes Competitor changes.
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
	 * Build custom notification message.
	 *
	 * @param string $message Base message.
	 * @param array  $data Additional data.
	 * @return string HTML message.
	 */
	private function build_custom_notification_message( $message, $data ) {
		$html_message = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">';
		$html_message .= '<h2 style="color: #0073aa;">' . __( 'SEO Bot Notification', 'rank-math-pro' ) . '</h2>';
		$html_message .= '<div style="background: #f8f9fa; padding: 20px; border-radius: 4px; margin: 20px 0;">';
		$html_message .= wp_kses_post( $message );
		$html_message .= '</div>';

		if ( ! empty( $data ) ) {
			$html_message .= '<h3>' . __( 'Additional Information', 'rank-math-pro' ) . '</h3>';
			$html_message .= '<ul>';
			foreach ( $data as $key => $value ) {
				$html_message .= '<li><strong>' . esc_html( ucwords( str_replace( '_', ' ', $key ) ) ) . ':</strong> ' . esc_html( $value ) . '</li>';
			}
			$html_message .= '</ul>';
		}

		$html_message .= '<p style="color: #666; font-size: 12px; margin-top: 30px;">';
		$html_message .= __( 'This is an automated message from Rank Math SEO Bot.', 'rank-math-pro' );
		$html_message .= '</p>';
		$html_message .= '</div>';

		return $html_message;
	}
}
