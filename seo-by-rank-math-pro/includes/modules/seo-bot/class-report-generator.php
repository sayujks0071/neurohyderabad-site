<?php
/**
 * Report Generator class for SEO Bot.
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
 * Report_Generator class.
 */
class Report_Generator {

	use Hooker;

	/**
	 * Generate SEO report.
	 *
	 * @param string $type Report type.
	 * @param string $format Report format.
	 * @return array Report data.
	 */
	public function generate_report( $type, $format = 'html' ) {
		$report_data = $this->collect_report_data( $type );
		$report_content = $this->format_report( $report_data, $type, $format );
		
		// Store report
		$report_id = 'report_' . $type . '_' . time();
		update_option( 'rank_math_seo_bot_report_' . $report_id, [
			'type' => $type,
			'format' => $format,
			'data' => $report_data,
			'content' => $report_content,
			'generated_at' => current_time( 'mysql' ),
		]);

		return [
			'report_id' => $report_id,
			'type' => $type,
			'format' => $format,
			'content' => $report_content,
			'download_url' => $this->get_report_download_url( $report_id ),
		];
	}

	/**
	 * Collect report data.
	 *
	 * @param string $type Report type.
	 * @return array Report data.
	 */
	private function collect_report_data( $type ) {
		$data = [
			'site_info' => $this->get_site_info(),
			'generated_at' => current_time( 'mysql' ),
			'period' => $this->get_report_period( $type ),
		];

		switch ( $type ) {
			case 'weekly':
				$data = array_merge( $data, $this->get_weekly_data() );
				break;
			case 'monthly':
				$data = array_merge( $data, $this->get_monthly_data() );
				break;
			case 'competitor':
				$data = array_merge( $data, $this->get_competitor_data() );
				break;
			case 'comprehensive':
			default:
				$data = array_merge( $data, $this->get_comprehensive_data() );
				break;
		}

		return $data;
	}

	/**
	 * Get site information.
	 *
	 * @return array Site information.
	 */
	private function get_site_info() {
		return [
			'name' => get_bloginfo( 'name' ),
			'url' => home_url(),
			'description' => get_bloginfo( 'description' ),
			'admin_email' => get_option( 'admin_email' ),
			'wordpress_version' => get_bloginfo( 'version' ),
			'rank_math_version' => defined( 'RANK_MATH_VERSION' ) ? RANK_MATH_VERSION : 'N/A',
			'rank_math_pro_version' => defined( 'RANK_MATH_PRO_VERSION' ) ? RANK_MATH_PRO_VERSION : 'N/A',
		];
	}

	/**
	 * Get report period.
	 *
	 * @param string $type Report type.
	 * @return array Report period.
	 */
	private function get_report_period( $type ) {
		switch ( $type ) {
			case 'weekly':
				return [
					'start' => date( 'Y-m-d', strtotime( '-7 days' ) ),
					'end' => date( 'Y-m-d' ),
					'label' => __( 'Last 7 days', 'rank-math-pro' ),
				];
			case 'monthly':
				return [
					'start' => date( 'Y-m-d', strtotime( '-30 days' ) ),
					'end' => date( 'Y-m-d' ),
					'label' => __( 'Last 30 days', 'rank-math-pro' ),
				];
			default:
				return [
					'start' => date( 'Y-m-d', strtotime( '-30 days' ) ),
					'end' => date( 'Y-m-d' ),
					'label' => __( 'Last 30 days', 'rank-math-pro' ),
				];
		}
	}

	/**
	 * Get weekly data.
	 *
	 * @return array Weekly data.
	 */
	private function get_weekly_data() {
		return [
			'rankings' => $this->get_ranking_data(),
			'content' => $this->get_content_data(),
			'technical' => $this->get_technical_data(),
			'keywords' => $this->get_keyword_data(),
		];
	}

	/**
	 * Get monthly data.
	 *
	 * @return array Monthly data.
	 */
	private function get_monthly_data() {
		$weekly_data = $this->get_weekly_data();
		
		// Add monthly-specific data
		$weekly_data['trends'] = $this->get_trends_data();
		$weekly_data['insights'] = $this->get_insights_data();
		$weekly_data['recommendations'] = $this->get_recommendations_data();

		return $weekly_data;
	}

	/**
	 * Get competitor data.
	 *
	 * @return array Competitor data.
	 */
	private function get_competitor_data() {
		$competitor_analysis = get_option( 'rank_math_seo_bot_competitor_analysis', [] );
		$competitor_insights = get_option( 'rank_math_seo_bot_competitor_insights', [] );

		return [
			'competitors' => $competitor_analysis,
			'insights' => $competitor_insights,
			'summary' => $this->get_competitor_summary( $competitor_analysis ),
		];
	}

	/**
	 * Get comprehensive data.
	 *
	 * @return array Comprehensive data.
	 */
	private function get_comprehensive_data() {
		$monthly_data = $this->get_monthly_data();
		$competitor_data = $this->get_competitor_data();

		return array_merge( $monthly_data, $competitor_data );
	}

	/**
	 * Get ranking data.
	 *
	 * @return array Ranking data.
	 */
	private function get_ranking_data() {
		$current_rankings = get_option( 'rank_math_seo_bot_current_rankings', [] );
		$previous_rankings = get_option( 'rank_math_seo_bot_previous_rankings', [] );
		$ranking_changes = get_option( 'rank_math_seo_bot_ranking_changes', [] );

		return [
			'current' => $current_rankings,
			'previous' => $previous_rankings,
			'changes' => $ranking_changes,
			'summary' => $this->get_ranking_summary( $current_rankings, $previous_rankings ),
		];
	}

	/**
	 * Get content data.
	 *
	 * @return array Content data.
	 */
	private function get_content_data() {
		$last_analysis = get_option( 'rank_math_seo_bot_last_analysis', [] );
		$content_analysis = $last_analysis['content_analysis'] ?? [];

		return [
			'analysis' => $content_analysis,
			'summary' => $this->get_content_summary( $content_analysis ),
		];
	}

	/**
	 * Get technical data.
	 *
	 * @return array Technical data.
	 */
	private function get_technical_data() {
		$technical_check = get_option( 'rank_math_seo_bot_technical_check', [] );
		$technical_issues = get_option( 'rank_math_seo_bot_technical_issues', [] );

		return [
			'checks' => $technical_check,
			'issues' => $technical_issues,
			'summary' => $this->get_technical_summary( $technical_check ),
		];
	}

	/**
	 * Get keyword data.
	 *
	 * @return array Keyword data.
	 */
	private function get_keyword_data() {
		$keyword_tracking = get_option( 'rank_math_seo_bot_keyword_tracking', [] );
		$keyword_trends = get_option( 'rank_math_seo_bot_keyword_trends', [] );

		return [
			'tracking' => $keyword_tracking,
			'trends' => $keyword_trends,
			'summary' => $this->get_keyword_summary( $keyword_tracking ),
		];
	}

	/**
	 * Get trends data.
	 *
	 * @return array Trends data.
	 */
	private function get_trends_data() {
		// This would analyze trends over time
		return [
			'ranking_trend' => 'improving',
			'content_trend' => 'stable',
			'technical_trend' => 'improving',
			'traffic_trend' => 'increasing',
		];
	}

	/**
	 * Get insights data.
	 *
	 * @return array Insights data.
	 */
	private function get_insights_data() {
		return [
			'top_improving_keywords' => $this->get_top_improving_keywords(),
			'top_dropping_keywords' => $this->get_top_dropping_keywords(),
			'content_opportunities' => $this->get_content_opportunities(),
			'technical_opportunities' => $this->get_technical_opportunities(),
		];
	}

	/**
	 * Get recommendations data.
	 *
	 * @return array Recommendations data.
	 */
	private function get_recommendations_data() {
		$last_analysis = get_option( 'rank_math_seo_bot_last_analysis', [] );
		$recommendations = $last_analysis['recommendations'] ?? [];

		return [
			'high_priority' => array_filter( $recommendations, function( $rec ) {
				return ( $rec['priority'] ?? 'medium' ) === 'high';
			}),
			'medium_priority' => array_filter( $recommendations, function( $rec ) {
				return ( $rec['priority'] ?? 'medium' ) === 'medium';
			}),
			'low_priority' => array_filter( $recommendations, function( $rec ) {
				return ( $rec['priority'] ?? 'medium' ) === 'low';
			}),
		];
	}

	/**
	 * Get ranking summary.
	 *
	 * @param array $current Current rankings.
	 * @param array $previous Previous rankings.
	 * @return array Ranking summary.
	 */
	private function get_ranking_summary( $current, $previous ) {
		$summary = [
			'total_keywords' => count( $current ),
			'improved' => 0,
			'dropped' => 0,
			'unchanged' => 0,
			'average_position' => 0,
		];

		$total_position = 0;
		$positioned_keywords = 0;

		foreach ( $current as $keyword => $current_data ) {
			$previous_data = $previous[ $keyword ] ?? null;
			
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
	 * Get content summary.
	 *
	 * @param array $content_analysis Content analysis.
	 * @return array Content summary.
	 */
	private function get_content_summary( $content_analysis ) {
		return [
			'total_posts' => $content_analysis['total_posts'] ?? 0,
			'optimized_posts' => $content_analysis['optimized_posts'] ?? 0,
			'needs_optimization' => count( $content_analysis['needs_optimization'] ?? [] ),
			'optimization_rate' => $this->calculate_optimization_rate( $content_analysis ),
		];
	}

	/**
	 * Calculate optimization rate.
	 *
	 * @param array $content_analysis Content analysis.
	 * @return float Optimization rate.
	 */
	private function calculate_optimization_rate( $content_analysis ) {
		$total_posts = $content_analysis['total_posts'] ?? 0;
		$optimized_posts = $content_analysis['optimized_posts'] ?? 0;

		if ( $total_posts === 0 ) {
			return 0;
		}

		return round( ( $optimized_posts / $total_posts ) * 100, 1 );
	}

	/**
	 * Get technical summary.
	 *
	 * @param array $technical_check Technical check results.
	 * @return array Technical summary.
	 */
	private function get_technical_summary( $technical_check ) {
		$summary = [
			'total_checks' => count( $technical_check ),
			'good_checks' => 0,
			'warning_checks' => 0,
			'error_checks' => 0,
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
	 * Get keyword summary.
	 *
	 * @param array $keyword_tracking Keyword tracking data.
	 * @return array Keyword summary.
	 */
	private function get_keyword_summary( $keyword_tracking ) {
		$summary = [
			'total_keywords' => count( $keyword_tracking ),
			'total_search_volume' => 0,
			'average_difficulty' => 0,
			'ranking_keywords' => 0,
		];

		$total_difficulty = 0;
		$difficulty_count = 0;

		foreach ( $keyword_tracking as $data ) {
			$summary['total_search_volume'] += $data['search_volume'] ?? 0;
			
			if ( $data['position'] > 0 ) {
				$summary['ranking_keywords']++;
			}

			if ( isset( $data['difficulty'] ) && $data['difficulty'] > 0 ) {
				$total_difficulty += $data['difficulty'];
				$difficulty_count++;
			}
		}

		if ( $difficulty_count > 0 ) {
			$summary['average_difficulty'] = round( $total_difficulty / $difficulty_count, 1 );
		}

		return $summary;
	}

	/**
	 * Get competitor summary.
	 *
	 * @param array $competitor_analysis Competitor analysis data.
	 * @return array Competitor summary.
	 */
	private function get_competitor_summary( $competitor_analysis ) {
		return [
			'total_competitors' => count( $competitor_analysis ),
			'last_analyzed' => ! empty( $competitor_analysis ) ? max( array_column( $competitor_analysis, 'last_analyzed' ) ) : null,
		];
	}

	/**
	 * Get top improving keywords.
	 *
	 * @return array Top improving keywords.
	 */
	private function get_top_improving_keywords() {
		$keyword_trends = get_option( 'rank_math_seo_bot_keyword_trends', [] );
		
		$improving = array_filter( $keyword_trends, function( $trend ) {
			return $trend['trend'] === 'improving';
		});

		// Sort by position change (most negative is best)
		uasort( $improving, function( $a, $b ) {
			return $a['position_change'] - $b['position_change'];
		});

		return array_slice( $improving, 0, 5, true );
	}

	/**
	 * Get top dropping keywords.
	 *
	 * @return array Top dropping keywords.
	 */
	private function get_top_dropping_keywords() {
		$keyword_trends = get_option( 'rank_math_seo_bot_keyword_trends', [] );
		
		$dropping = array_filter( $keyword_trends, function( $trend ) {
			return $trend['trend'] === 'declining';
		});

		// Sort by position change (most positive is worst)
		uasort( $dropping, function( $a, $b ) {
			return $b['position_change'] - $a['position_change'];
		});

		return array_slice( $dropping, 0, 5, true );
	}

	/**
	 * Get content opportunities.
	 *
	 * @return array Content opportunities.
	 */
	private function get_content_opportunities() {
		$last_analysis = get_option( 'rank_math_seo_bot_last_analysis', [] );
		$needs_optimization = $last_analysis['content_analysis']['needs_optimization'] ?? [];

		// Sort by score (lowest first)
		usort( $needs_optimization, function( $a, $b ) {
			return $a['score'] - $b['score'];
		});

		return array_slice( $needs_optimization, 0, 5 );
	}

	/**
	 * Get technical opportunities.
	 *
	 * @return array Technical opportunities.
	 */
	private function get_technical_opportunities() {
		$technical_issues = get_option( 'rank_math_seo_bot_technical_issues', [] );

		// Sort by severity
		usort( $technical_issues, function( $a, $b ) {
			$severity_order = [ 'high' => 3, 'medium' => 2, 'low' => 1 ];
			return $severity_order[ $b['severity'] ] - $severity_order[ $a['severity'] ];
		});

		return array_slice( $technical_issues, 0, 5 );
	}

	/**
	 * Format report.
	 *
	 * @param array  $data Report data.
	 * @param string $type Report type.
	 * @param string $format Report format.
	 * @return string Formatted report.
	 */
	private function format_report( $data, $type, $format ) {
		switch ( $format ) {
			case 'html':
				return $this->format_html_report( $data, $type );
			case 'pdf':
				return $this->format_pdf_report( $data, $type );
			case 'csv':
				return $this->format_csv_report( $data, $type );
			default:
				return $this->format_html_report( $data, $type );
		}
	}

	/**
	 * Format HTML report.
	 *
	 * @param array  $data Report data.
	 * @param string $type Report type.
	 * @return string HTML report.
	 */
	private function format_html_report( $data, $type ) {
		ob_start();
		?>
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="UTF-8">
			<title><?php echo esc_html( sprintf( __( '%s SEO Report - %s', 'rank-math-pro' ), ucfirst( $type ), $data['site_info']['name'] ) ); ?></title>
			<style>
				body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
				.report-container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
				.header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #0073aa; padding-bottom: 20px; }
				.header h1 { color: #0073aa; margin: 0; }
				.header p { color: #666; margin: 5px 0; }
				.section { margin-bottom: 30px; }
				.section h2 { color: #23282d; border-bottom: 1px solid #e1e5e9; padding-bottom: 10px; }
				.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin: 20px 0; }
				.stat-item { background: #f8f9fa; padding: 15px; border-radius: 6px; text-align: center; }
				.stat-number { font-size: 24px; font-weight: bold; color: #0073aa; }
				.stat-label { font-size: 12px; color: #666; text-transform: uppercase; }
				.table { width: 100%; border-collapse: collapse; margin: 20px 0; }
				.table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #e1e5e9; }
				.table th { background: #f8f9fa; font-weight: 600; }
				.recommendation { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 10px 0; }
				.recommendation.high { background: #f8d7da; border-color: #f5c6cb; }
				.recommendation.medium { background: #fff3cd; border-color: #ffeaa7; }
				.recommendation.low { background: #d4edda; border-color: #c3e6cb; }
				.footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e1e5e9; text-align: center; color: #666; font-size: 12px; }
			</style>
		</head>
		<body>
			<div class="report-container">
				<div class="header">
					<h1><?php echo esc_html( sprintf( __( '%s SEO Report', 'rank-math-pro' ), ucfirst( $type ) ) ); ?></h1>
					<p><?php echo esc_html( $data['site_info']['name'] ); ?></p>
					<p><?php echo esc_html( $data['site_info']['url'] ); ?></p>
					<p><?php echo esc_html( sprintf( __( 'Generated on %s', 'rank-math-pro' ), date_i18n( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ), strtotime( $data['generated_at'] ) ) ); ?></p>
					<p><?php echo esc_html( $data['period']['label'] ); ?></p>
				</div>

				<?php if ( isset( $data['rankings'] ) ) : ?>
				<div class="section">
					<h2><?php esc_html_e( 'Ranking Summary', 'rank-math-pro' ); ?></h2>
					<div class="stats-grid">
						<div class="stat-item">
							<div class="stat-number"><?php echo esc_html( $data['rankings']['summary']['total_keywords'] ); ?></div>
							<div class="stat-label"><?php esc_html_e( 'Total Keywords', 'rank-math-pro' ); ?></div>
						</div>
						<div class="stat-item">
							<div class="stat-number"><?php echo esc_html( $data['rankings']['summary']['average_position'] ); ?></div>
							<div class="stat-label"><?php esc_html_e( 'Average Position', 'rank-math-pro' ); ?></div>
						</div>
						<div class="stat-item">
							<div class="stat-number" style="color: #46b450;"><?php echo esc_html( $data['rankings']['summary']['improved'] ); ?></div>
							<div class="stat-label"><?php esc_html_e( 'Improved', 'rank-math-pro' ); ?></div>
						</div>
						<div class="stat-item">
							<div class="stat-number" style="color: #dc3232;"><?php echo esc_html( $data['rankings']['summary']['dropped'] ); ?></div>
							<div class="stat-label"><?php esc_html_e( 'Dropped', 'rank-math-pro' ); ?></div>
						</div>
					</div>
				</div>
				<?php endif; ?>

				<?php if ( isset( $data['content'] ) ) : ?>
				<div class="section">
					<h2><?php esc_html_e( 'Content Analysis', 'rank-math-pro' ); ?></h2>
					<div class="stats-grid">
						<div class="stat-item">
							<div class="stat-number"><?php echo esc_html( $data['content']['summary']['total_posts'] ); ?></div>
							<div class="stat-label"><?php esc_html_e( 'Total Posts', 'rank-math-pro' ); ?></div>
						</div>
						<div class="stat-item">
							<div class="stat-number" style="color: #46b450;"><?php echo esc_html( $data['content']['summary']['optimized_posts'] ); ?></div>
							<div class="stat-label"><?php esc_html_e( 'Optimized', 'rank-math-pro' ); ?></div>
						</div>
						<div class="stat-item">
							<div class="stat-number" style="color: #ffb900;"><?php echo esc_html( $data['content']['summary']['needs_optimization'] ); ?></div>
							<div class="stat-label"><?php esc_html_e( 'Need Optimization', 'rank-math-pro' ); ?></div>
						</div>
						<div class="stat-item">
							<div class="stat-number"><?php echo esc_html( $data['content']['summary']['optimization_rate'] ); ?>%</div>
							<div class="stat-label"><?php esc_html_e( 'Optimization Rate', 'rank-math-pro' ); ?></div>
						</div>
					</div>
				</div>
				<?php endif; ?>

				<?php if ( isset( $data['technical'] ) ) : ?>
				<div class="section">
					<h2><?php esc_html_e( 'Technical SEO', 'rank-math-pro' ); ?></h2>
					<div class="stats-grid">
						<div class="stat-item">
							<div class="stat-number"><?php echo esc_html( $data['technical']['summary']['total_checks'] ); ?></div>
							<div class="stat-label"><?php esc_html_e( 'Total Checks', 'rank-math-pro' ); ?></div>
						</div>
						<div class="stat-item">
							<div class="stat-number" style="color: #46b450;"><?php echo esc_html( $data['technical']['summary']['good_checks'] ); ?></div>
							<div class="stat-label"><?php esc_html_e( 'Good', 'rank-math-pro' ); ?></div>
						</div>
						<div class="stat-item">
							<div class="stat-number" style="color: #ffb900;"><?php echo esc_html( $data['technical']['summary']['warning_checks'] ); ?></div>
							<div class="stat-label"><?php esc_html_e( 'Warnings', 'rank-math-pro' ); ?></div>
						</div>
						<div class="stat-item">
							<div class="stat-number" style="color: #dc3232;"><?php echo esc_html( $data['technical']['summary']['error_checks'] ); ?></div>
							<div class="stat-label"><?php esc_html_e( 'Errors', 'rank-math-pro' ); ?></div>
						</div>
					</div>
				</div>
				<?php endif; ?>

				<?php if ( isset( $data['recommendations'] ) ) : ?>
				<div class="section">
					<h2><?php esc_html_e( 'Recommendations', 'rank-math-pro' ); ?></h2>
					
					<?php if ( ! empty( $data['recommendations']['high_priority'] ) ) : ?>
					<h3><?php esc_html_e( 'High Priority', 'rank-math-pro' ); ?></h3>
					<?php foreach ( $data['recommendations']['high_priority'] as $recommendation ) : ?>
					<div class="recommendation high">
						<h4><?php echo esc_html( $recommendation['title'] ?? '' ); ?></h4>
						<p><?php echo esc_html( $recommendation['description'] ?? '' ); ?></p>
					</div>
					<?php endforeach; ?>
					<?php endif; ?>

					<?php if ( ! empty( $data['recommendations']['medium_priority'] ) ) : ?>
					<h3><?php esc_html_e( 'Medium Priority', 'rank-math-pro' ); ?></h3>
					<?php foreach ( $data['recommendations']['medium_priority'] as $recommendation ) : ?>
					<div class="recommendation medium">
						<h4><?php echo esc_html( $recommendation['title'] ?? '' ); ?></h4>
						<p><?php echo esc_html( $recommendation['description'] ?? '' ); ?></p>
					</div>
					<?php endforeach; ?>
					<?php endif; ?>

					<?php if ( ! empty( $data['recommendations']['low_priority'] ) ) : ?>
					<h3><?php esc_html_e( 'Low Priority', 'rank-math-pro' ); ?></h3>
					<?php foreach ( $data['recommendations']['low_priority'] as $recommendation ) : ?>
					<div class="recommendation low">
						<h4><?php echo esc_html( $recommendation['title'] ?? '' ); ?></h4>
						<p><?php echo esc_html( $recommendation['description'] ?? '' ); ?></p>
					</div>
					<?php endforeach; ?>
					<?php endif; ?>
				</div>
				<?php endif; ?>

				<div class="footer">
					<p><?php esc_html_e( 'This report was generated by Rank Math SEO Bot', 'rank-math-pro' ); ?></p>
					<p><?php echo esc_html( sprintf( __( 'Rank Math Version: %s | Rank Math Pro Version: %s', 'rank-math-pro' ), $data['site_info']['rank_math_version'], $data['site_info']['rank_math_pro_version'] ) ); ?></p>
				</div>
			</div>
		</body>
		</html>
		<?php
		return ob_get_clean();
	}

	/**
	 * Format PDF report.
	 *
	 * @param array  $data Report data.
	 * @param string $type Report type.
	 * @return string PDF report.
	 */
	private function format_pdf_report( $data, $type ) {
		// This would generate a PDF report
		// For now, return HTML that can be converted to PDF
		return $this->format_html_report( $data, $type );
	}

	/**
	 * Format CSV report.
	 *
	 * @param array  $data Report data.
	 * @param string $type Report type.
	 * @return string CSV report.
	 */
	private function format_csv_report( $data, $type ) {
		$csv_data = [];
		
		// Add basic info
		$csv_data[] = [ 'Metric', 'Value' ];
		$csv_data[] = [ 'Site Name', $data['site_info']['name'] ];
		$csv_data[] = [ 'Site URL', $data['site_info']['url'] ];
		$csv_data[] = [ 'Generated At', $data['generated_at'] ];
		$csv_data[] = [ 'Period', $data['period']['label'] ];
		$csv_data[] = [ '', '' ]; // Empty row

		// Add ranking data
		if ( isset( $data['rankings']['summary'] ) ) {
			$csv_data[] = [ 'RANKING SUMMARY', '' ];
			$csv_data[] = [ 'Total Keywords', $data['rankings']['summary']['total_keywords'] ];
			$csv_data[] = [ 'Average Position', $data['rankings']['summary']['average_position'] ];
			$csv_data[] = [ 'Improved', $data['rankings']['summary']['improved'] ];
			$csv_data[] = [ 'Dropped', $data['rankings']['summary']['dropped'] ];
			$csv_data[] = [ 'Unchanged', $data['rankings']['summary']['unchanged'] ];
			$csv_data[] = [ '', '' ]; // Empty row
		}

		// Add content data
		if ( isset( $data['content']['summary'] ) ) {
			$csv_data[] = [ 'CONTENT SUMMARY', '' ];
			$csv_data[] = [ 'Total Posts', $data['content']['summary']['total_posts'] ];
			$csv_data[] = [ 'Optimized Posts', $data['content']['summary']['optimized_posts'] ];
			$csv_data[] = [ 'Needs Optimization', $data['content']['summary']['needs_optimization'] ];
			$csv_data[] = [ 'Optimization Rate', $data['content']['summary']['optimization_rate'] . '%' ];
			$csv_data[] = [ '', '' ]; // Empty row
		}

		// Convert to CSV string
		$output = fopen( 'php://temp', 'r+' );
		foreach ( $csv_data as $row ) {
			fputcsv( $output, $row );
		}
		rewind( $output );
		$csv_string = stream_get_contents( $output );
		fclose( $output );

		return $csv_string;
	}

	/**
	 * Get report download URL.
	 *
	 * @param string $report_id Report ID.
	 * @return string Download URL.
	 */
	private function get_report_download_url( $report_id ) {
		return add_query_arg( [
			'action' => 'download_seo_report',
			'report_id' => $report_id,
			'nonce' => wp_create_nonce( 'download_seo_report_' . $report_id ),
		], admin_url( 'admin-ajax.php' ) );
	}
}
