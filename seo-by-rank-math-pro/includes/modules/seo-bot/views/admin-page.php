<?php
/**
 * SEO Bot Admin Page Template.
 *
 * @since      3.0.99
 * @package    RankMathPro
 * @subpackage RankMathPro\SEO_Bot
 * @author     Rank Math <support@rankmath.com>
 */

defined( 'ABSPATH' ) || exit;

$config = get_option( 'rank_math_seo_bot_config', [] );
$last_analysis = get_option( 'rank_math_seo_bot_last_analysis', [] );
$ranking_summary = get_option( 'rank_math_seo_bot_ranking_summary', [] );
$competitor_summary = get_option( 'rank_math_seo_bot_competitor_summary', [] );
?>

<div class="rank-math-seo-bot-admin">
	<div class="rank-math-seo-bot-header">
		<h1><?php esc_html_e( 'SEO Bot', 'rank-math-pro' ); ?></h1>
		<p class="description">
			<?php esc_html_e( 'Automated SEO optimization and monitoring for your website.', 'rank-math-pro' ); ?>
		</p>
	</div>

	<div class="rank-math-seo-bot-tabs">
		<nav class="nav-tab-wrapper">
			<a href="#dashboard" class="nav-tab nav-tab-active" data-tab="dashboard">
				<?php esc_html_e( 'Dashboard', 'rank-math-pro' ); ?>
			</a>
			<a href="#configuration" class="nav-tab" data-tab="configuration">
				<?php esc_html_e( 'Configuration', 'rank-math-pro' ); ?>
			</a>
			<a href="#analysis" class="nav-tab" data-tab="analysis">
				<?php esc_html_e( 'Analysis', 'rank-math-pro' ); ?>
			</a>
			<a href="#rankings" class="nav-tab" data-tab="rankings">
				<?php esc_html_e( 'Rankings', 'rank-math-pro' ); ?>
			</a>
			<a href="#competitors" class="nav-tab" data-tab="competitors">
				<?php esc_html_e( 'Competitors', 'rank-math-pro' ); ?>
			</a>
			<a href="#reports" class="nav-tab" data-tab="reports">
				<?php esc_html_e( 'Reports', 'rank-math-pro' ); ?>
			</a>
		</nav>
	</div>

	<div class="rank-math-seo-bot-content">
		<!-- Dashboard Tab -->
		<div id="dashboard" class="tab-content active">
			<div class="rank-math-seo-bot-dashboard">
				<div class="dashboard-grid">
					<!-- Status Overview -->
					<div class="dashboard-card">
						<h3><?php esc_html_e( 'Bot Status', 'rank-math-pro' ); ?></h3>
						<div class="status-indicator">
							<span class="status-dot <?php echo ! empty( $config['enabled'] ) ? 'active' : 'inactive'; ?>"></span>
							<span class="status-text">
								<?php echo ! empty( $config['enabled'] ) ? __( 'Active', 'rank-math-pro' ) : __( 'Inactive', 'rank-math-pro' ); ?>
							</span>
						</div>
						<div class="status-actions">
							<button type="button" class="button button-primary toggle-bot" data-enabled="<?php echo ! empty( $config['enabled'] ) ? '1' : '0'; ?>">
								<?php echo ! empty( $config['enabled'] ) ? __( 'Disable Bot', 'rank-math-pro' ) : __( 'Enable Bot', 'rank-math-pro' ); ?>
							</button>
						</div>
					</div>

					<!-- Last Analysis -->
					<div class="dashboard-card">
						<h3><?php esc_html_e( 'Last Analysis', 'rank-math-pro' ); ?></h3>
						<div class="analysis-info">
							<?php if ( ! empty( $last_analysis ) ) : ?>
								<p class="analysis-date">
									<?php echo esc_html( date_i18n( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ), strtotime( $last_analysis['timestamp'] ?? current_time( 'mysql' ) ) ) ); ?>
								</p>
								<div class="analysis-summary">
									<?php if ( isset( $last_analysis['content_analysis'] ) ) : ?>
										<div class="summary-item">
											<span class="label"><?php esc_html_e( 'Content Analyzed:', 'rank-math-pro' ); ?></span>
											<span class="value"><?php echo esc_html( $last_analysis['content_analysis']['total_posts'] ?? 0 ); ?> posts</span>
										</div>
									<?php endif; ?>
									<?php if ( isset( $last_analysis['recommendations'] ) ) : ?>
										<div class="summary-item">
											<span class="label"><?php esc_html_e( 'Recommendations:', 'rank-math-pro' ); ?></span>
											<span class="value"><?php echo esc_html( count( $last_analysis['recommendations'] ?? [] ) ); ?></span>
										</div>
									<?php endif; ?>
								</div>
							<?php else : ?>
								<p class="no-data"><?php esc_html_e( 'No analysis data available', 'rank-math-pro' ); ?></p>
							<?php endif; ?>
						</div>
						<div class="analysis-actions">
							<button type="button" class="button run-analysis">
								<?php esc_html_e( 'Run Analysis', 'rank-math-pro' ); ?>
							</button>
						</div>
					</div>

					<!-- Ranking Summary -->
					<div class="dashboard-card">
						<h3><?php esc_html_e( 'Ranking Summary', 'rank-math-pro' ); ?></h3>
						<div class="ranking-info">
							<?php if ( ! empty( $ranking_summary ) ) : ?>
								<div class="ranking-stats">
									<div class="stat-item">
										<span class="stat-number"><?php echo esc_html( $ranking_summary['total_keywords'] ?? 0 ); ?></span>
										<span class="stat-label"><?php esc_html_e( 'Keywords', 'rank-math-pro' ); ?></span>
									</div>
									<div class="stat-item">
										<span class="stat-number"><?php echo esc_html( $ranking_summary['average_position'] ?? 0 ); ?></span>
										<span class="stat-label"><?php esc_html_e( 'Avg Position', 'rank-math-pro' ); ?></span>
									</div>
									<div class="stat-item">
										<span class="stat-number improved"><?php echo esc_html( $ranking_summary['improved'] ?? 0 ); ?></span>
										<span class="stat-label"><?php esc_html_e( 'Improved', 'rank-math-pro' ); ?></span>
									</div>
									<div class="stat-item">
										<span class="stat-number dropped"><?php echo esc_html( $ranking_summary['dropped'] ?? 0 ); ?></span>
										<span class="stat-label"><?php esc_html_e( 'Dropped', 'rank-math-pro' ); ?></span>
									</div>
								</div>
							<?php else : ?>
								<p class="no-data"><?php esc_html_e( 'No ranking data available', 'rank-math-pro' ); ?></p>
							<?php endif; ?>
						</div>
						<div class="ranking-actions">
							<button type="button" class="button check-rankings">
								<?php esc_html_e( 'Check Rankings', 'rank-math-pro' ); ?>
							</button>
						</div>
					</div>

					<!-- Competitor Summary -->
					<div class="dashboard-card">
						<h3><?php esc_html_e( 'Competitor Analysis', 'rank-math-pro' ); ?></h3>
						<div class="competitor-info">
							<?php if ( ! empty( $competitor_summary ) ) : ?>
								<div class="competitor-stats">
									<div class="stat-item">
										<span class="stat-number"><?php echo esc_html( $competitor_summary['total_competitors'] ?? 0 ); ?></span>
										<span class="stat-label"><?php esc_html_e( 'Competitors', 'rank-math-pro' ); ?></span>
									</div>
									<?php if ( ! empty( $competitor_summary['last_analyzed'] ) ) : ?>
										<div class="stat-item">
											<span class="stat-label"><?php esc_html_e( 'Last Analyzed:', 'rank-math-pro' ); ?></span>
											<span class="stat-value"><?php echo esc_html( date_i18n( get_option( 'date_format' ), strtotime( $competitor_summary['last_analyzed'] ) ) ); ?></span>
										</div>
									<?php endif; ?>
								</div>
							<?php else : ?>
								<p class="no-data"><?php esc_html_e( 'No competitor data available', 'rank-math-pro' ); ?></p>
							<?php endif; ?>
						</div>
						<div class="competitor-actions">
							<button type="button" class="button analyze-competitors">
								<?php esc_html_e( 'Analyze Competitors', 'rank-math-pro' ); ?>
							</button>
						</div>
					</div>
				</div>

				<!-- Quick Actions -->
				<div class="quick-actions">
					<h3><?php esc_html_e( 'Quick Actions', 'rank-math-pro' ); ?></h3>
					<div class="actions-grid">
						<button type="button" class="button button-primary run-comprehensive-analysis">
							<?php esc_html_e( 'Run Comprehensive Analysis', 'rank-math-pro' ); ?>
						</button>
						<button type="button" class="button generate-report">
							<?php esc_html_e( 'Generate Report', 'rank-math-pro' ); ?>
						</button>
						<button type="button" class="button optimize-content">
							<?php esc_html_e( 'Optimize Content', 'rank-math-pro' ); ?>
						</button>
						<button type="button" class="button check-technical-seo">
							<?php esc_html_e( 'Check Technical SEO', 'rank-math-pro' ); ?>
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Configuration Tab -->
		<div id="configuration" class="tab-content">
			<div class="rank-math-seo-bot-config">
				<form id="seo-bot-config-form">
					<?php wp_nonce_field( 'rank_math_seo_bot_nonce', 'nonce' ); ?>
					
					<div class="config-section">
						<h3><?php esc_html_e( 'General Settings', 'rank-math-pro' ); ?></h3>
						<table class="form-table">
							<tr>
								<th scope="row">
									<label for="enabled"><?php esc_html_e( 'Enable SEO Bot', 'rank-math-pro' ); ?></label>
								</th>
								<td>
									<label class="toggle-switch">
										<input type="checkbox" id="enabled" name="enabled" value="1" <?php checked( ! empty( $config['enabled'] ) ); ?>>
										<span class="toggle-slider"></span>
									</label>
									<p class="description"><?php esc_html_e( 'Enable or disable the SEO Bot functionality.', 'rank-math-pro' ); ?></p>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<label for="monitoring_interval"><?php esc_html_e( 'Monitoring Interval', 'rank-math-pro' ); ?></label>
								</th>
								<td>
									<select id="monitoring_interval" name="monitoring_interval">
										<option value="hourly" <?php selected( $config['monitoring_interval'] ?? 'daily', 'hourly' ); ?>><?php esc_html_e( 'Hourly', 'rank-math-pro' ); ?></option>
										<option value="daily" <?php selected( $config['monitoring_interval'] ?? 'daily', 'daily' ); ?>><?php esc_html_e( 'Daily', 'rank-math-pro' ); ?></option>
										<option value="weekly" <?php selected( $config['monitoring_interval'] ?? 'daily', 'weekly' ); ?>><?php esc_html_e( 'Weekly', 'rank-math-pro' ); ?></option>
									</select>
									<p class="description"><?php esc_html_e( 'How often the bot should run automated tasks.', 'rank-math-pro' ); ?></p>
								</td>
							</tr>
						</table>
					</div>

					<div class="config-section">
						<h3><?php esc_html_e( 'Automation Features', 'rank-math-pro' ); ?></h3>
						<table class="form-table">
							<tr>
								<th scope="row">
									<label for="auto_optimize_content"><?php esc_html_e( 'Auto-Optimize Content', 'rank-math-pro' ); ?></label>
								</th>
								<td>
									<label class="toggle-switch">
										<input type="checkbox" id="auto_optimize_content" name="auto_optimize_content" value="1" <?php checked( ! empty( $config['auto_optimize_content'] ) ); ?>>
										<span class="toggle-slider"></span>
									</label>
									<p class="description"><?php esc_html_e( 'Automatically optimize content when posts are saved.', 'rank-math-pro' ); ?></p>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<label for="monitor_rankings"><?php esc_html_e( 'Monitor Rankings', 'rank-math-pro' ); ?></label>
								</th>
								<td>
									<label class="toggle-switch">
										<input type="checkbox" id="monitor_rankings" name="monitor_rankings" value="1" <?php checked( ! empty( $config['monitor_rankings'] ) ); ?>>
										<span class="toggle-slider"></span>
									</label>
									<p class="description"><?php esc_html_e( 'Monitor keyword rankings and detect changes.', 'rank-math-pro' ); ?></p>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<label for="competitor_analysis"><?php esc_html_e( 'Competitor Analysis', 'rank-math-pro' ); ?></label>
								</th>
								<td>
									<label class="toggle-switch">
										<input type="checkbox" id="competitor_analysis" name="competitor_analysis" value="1" <?php checked( ! empty( $config['competitor_analysis'] ) ); ?>>
										<span class="toggle-slider"></span>
									</label>
									<p class="description"><?php esc_html_e( 'Analyze competitors and identify opportunities.', 'rank-math-pro' ); ?></p>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<label for="keyword_tracking"><?php esc_html_e( 'Keyword Tracking', 'rank-math-pro' ); ?></label>
								</th>
								<td>
									<label class="toggle-switch">
										<input type="checkbox" id="keyword_tracking" name="keyword_tracking" value="1" <?php checked( ! empty( $config['keyword_tracking'] ) ); ?>>
										<span class="toggle-slider"></span>
									</label>
									<p class="description"><?php esc_html_e( 'Track keyword performance and trends.', 'rank-math-pro' ); ?></p>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<label for="content_suggestions"><?php esc_html_e( 'Content Suggestions', 'rank-math-pro' ); ?></label>
								</th>
								<td>
									<label class="toggle-switch">
										<input type="checkbox" id="content_suggestions" name="content_suggestions" value="1" <?php checked( ! empty( $config['content_suggestions'] ) ); ?>>
										<span class="toggle-slider"></span>
									</label>
									<p class="description"><?php esc_html_e( 'Provide content optimization suggestions.', 'rank-math-pro' ); ?></p>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<label for="technical_seo_monitoring"><?php esc_html_e( 'Technical SEO Monitoring', 'rank-math-pro' ); ?></label>
								</th>
								<td>
									<label class="toggle-switch">
										<input type="checkbox" id="technical_seo_monitoring" name="technical_seo_monitoring" value="1" <?php checked( ! empty( $config['technical_seo_monitoring'] ) ); ?>>
										<span class="toggle-slider"></span>
									</label>
									<p class="description"><?php esc_html_e( 'Monitor technical SEO aspects of your site.', 'rank-math-pro' ); ?></p>
								</td>
							</tr>
						</table>
					</div>

					<div class="config-section">
						<h3><?php esc_html_e( 'Notifications', 'rank-math-pro' ); ?></h3>
						<table class="form-table">
							<tr>
								<th scope="row">
									<label for="email_notifications"><?php esc_html_e( 'Email Notifications', 'rank-math-pro' ); ?></label>
								</th>
								<td>
									<label class="toggle-switch">
										<input type="checkbox" id="email_notifications" name="email_notifications" value="1" <?php checked( ! empty( $config['email_notifications'] ) ); ?>>
										<span class="toggle-slider"></span>
									</label>
									<p class="description"><?php esc_html_e( 'Send email notifications for important changes.', 'rank-math-pro' ); ?></p>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<label for="notification_frequency"><?php esc_html_e( 'Notification Frequency', 'rank-math-pro' ); ?></label>
								</th>
								<td>
									<select id="notification_frequency" name="notification_frequency">
										<option value="daily" <?php selected( $config['notification_frequency'] ?? 'weekly', 'daily' ); ?>><?php esc_html_e( 'Daily', 'rank-math-pro' ); ?></option>
										<option value="weekly" <?php selected( $config['notification_frequency'] ?? 'weekly', 'weekly' ); ?>><?php esc_html_e( 'Weekly', 'rank-math-pro' ); ?></option>
										<option value="monthly" <?php selected( $config['notification_frequency'] ?? 'weekly', 'monthly' ); ?>><?php esc_html_e( 'Monthly', 'rank-math-pro' ); ?></option>
									</select>
									<p class="description"><?php esc_html_e( 'How often to send notification emails.', 'rank-math-pro' ); ?></p>
								</td>
							</tr>
							<tr>
								<th scope="row">
									<label for="notification_email"><?php esc_html_e( 'Notification Email', 'rank-math-pro' ); ?></label>
								</th>
								<td>
									<input type="email" id="notification_email" name="notification_email" value="<?php echo esc_attr( $config['notification_email'] ?? get_option( 'admin_email' ) ); ?>" class="regular-text">
									<p class="description"><?php esc_html_e( 'Email address to receive notifications.', 'rank-math-pro' ); ?></p>
								</td>
							</tr>
						</table>
					</div>

					<div class="config-section">
						<h3><?php esc_html_e( 'Priority Keywords', 'rank-math-pro' ); ?></h3>
						<table class="form-table">
							<tr>
								<th scope="row">
									<label for="priority_keywords"><?php esc_html_e( 'Keywords to Track', 'rank-math-pro' ); ?></label>
								</th>
								<td>
									<textarea id="priority_keywords" name="priority_keywords" rows="5" class="large-text" placeholder="<?php esc_attr_e( 'Enter keywords, one per line', 'rank-math-pro' ); ?>"><?php echo esc_textarea( implode( "\n", $config['priority_keywords'] ?? [] ) ); ?></textarea>
									<p class="description"><?php esc_html_e( 'Enter keywords you want to track for ranking changes.', 'rank-math-pro' ); ?></p>
								</td>
							</tr>
						</table>
					</div>

					<div class="config-section">
						<h3><?php esc_html_e( 'Competitor URLs', 'rank-math-pro' ); ?></h3>
						<table class="form-table">
							<tr>
								<th scope="row">
									<label for="competitor_urls"><?php esc_html_e( 'Competitor Websites', 'rank-math-pro' ); ?></label>
								</th>
								<td>
									<textarea id="competitor_urls" name="competitor_urls" rows="5" class="large-text" placeholder="<?php esc_attr_e( 'Enter competitor URLs, one per line', 'rank-math-pro' ); ?>"><?php echo esc_textarea( implode( "\n", $config['competitor_urls'] ?? [] ) ); ?></textarea>
									<p class="description"><?php esc_html_e( 'Enter competitor website URLs to analyze.', 'rank-math-pro' ); ?></p>
								</td>
							</tr>
						</table>
					</div>

					<div class="config-actions">
						<button type="submit" class="button button-primary">
							<?php esc_html_e( 'Save Configuration', 'rank-math-pro' ); ?>
						</button>
						<button type="button" class="button reset-config">
							<?php esc_html_e( 'Reset to Defaults', 'rank-math-pro' ); ?>
						</button>
					</div>
				</form>
			</div>
		</div>

		<!-- Analysis Tab -->
		<div id="analysis" class="tab-content">
			<div class="rank-math-seo-bot-analysis">
				<div class="analysis-header">
					<h3><?php esc_html_e( 'SEO Analysis Results', 'rank-math-pro' ); ?></h3>
					<button type="button" class="button button-primary run-analysis">
						<?php esc_html_e( 'Run New Analysis', 'rank-math-pro' ); ?>
					</button>
				</div>

				<div class="analysis-results">
					<?php if ( ! empty( $last_analysis ) ) : ?>
						<div class="analysis-sections">
							<!-- Content Analysis -->
							<?php if ( isset( $last_analysis['content_analysis'] ) ) : ?>
								<div class="analysis-section">
									<h4><?php esc_html_e( 'Content Analysis', 'rank-math-pro' ); ?></h4>
									<div class="analysis-content">
										<div class="analysis-stats">
											<div class="stat-item">
												<span class="stat-number"><?php echo esc_html( $last_analysis['content_analysis']['total_posts'] ?? 0 ); ?></span>
												<span class="stat-label"><?php esc_html_e( 'Total Posts', 'rank-math-pro' ); ?></span>
											</div>
											<div class="stat-item">
												<span class="stat-number"><?php echo esc_html( $last_analysis['content_analysis']['optimized_posts'] ?? 0 ); ?></span>
												<span class="stat-label"><?php esc_html_e( 'Optimized Posts', 'rank-math-pro' ); ?></span>
											</div>
											<div class="stat-item">
												<span class="stat-number"><?php echo esc_html( count( $last_analysis['content_analysis']['needs_optimization'] ?? [] ) ); ?></span>
												<span class="stat-label"><?php esc_html_e( 'Need Optimization', 'rank-math-pro' ); ?></span>
											</div>
										</div>

										<?php if ( ! empty( $last_analysis['content_analysis']['needs_optimization'] ) ) : ?>
											<div class="optimization-list">
												<h5><?php esc_html_e( 'Posts Needing Optimization', 'rank-math-pro' ); ?></h5>
												<ul>
													<?php foreach ( array_slice( $last_analysis['content_analysis']['needs_optimization'], 0, 10 ) as $post ) : ?>
														<li>
															<a href="<?php echo esc_url( $post['url'] ); ?>" target="_blank">
																<?php echo esc_html( $post['title'] ); ?>
															</a>
															<span class="score">Score: <?php echo esc_html( $post['score'] ); ?></span>
														</li>
													<?php endforeach; ?>
												</ul>
											</div>
										<?php endif; ?>
									</div>
								</div>
							<?php endif; ?>

							<!-- Technical SEO -->
							<?php if ( isset( $last_analysis['technical_seo'] ) ) : ?>
								<div class="analysis-section">
									<h4><?php esc_html_e( 'Technical SEO', 'rank-math-pro' ); ?></h4>
									<div class="analysis-content">
										<div class="technical-checks">
											<?php foreach ( $last_analysis['technical_seo'] as $check => $result ) : ?>
												<div class="check-item">
													<span class="check-name"><?php echo esc_html( ucwords( str_replace( '_', ' ', $check ) ) ); ?></span>
													<span class="check-status status-<?php echo esc_attr( $result['status'] ?? 'unknown' ); ?>">
														<?php echo esc_html( ucfirst( $result['status'] ?? 'unknown' ) ); ?>
													</span>
												</div>
											<?php endforeach; ?>
										</div>
									</div>
								</div>
							<?php endif; ?>

							<!-- Recommendations -->
							<?php if ( ! empty( $last_analysis['recommendations'] ) ) : ?>
								<div class="analysis-section">
									<h4><?php esc_html_e( 'Recommendations', 'rank-math-pro' ); ?></h4>
									<div class="analysis-content">
										<div class="recommendations-list">
											<?php foreach ( $last_analysis['recommendations'] as $recommendation ) : ?>
												<div class="recommendation-item priority-<?php echo esc_attr( $recommendation['priority'] ?? 'medium' ); ?>">
													<div class="recommendation-header">
														<h5><?php echo esc_html( $recommendation['title'] ?? '' ); ?></h5>
														<span class="priority-badge priority-<?php echo esc_attr( $recommendation['priority'] ?? 'medium' ); ?>">
															<?php echo esc_html( ucfirst( $recommendation['priority'] ?? 'medium' ) ); ?>
														</span>
													</div>
													<p class="recommendation-description">
														<?php echo esc_html( $recommendation['description'] ?? '' ); ?>
													</p>
													<?php if ( isset( $recommendation['action'] ) ) : ?>
														<button type="button" class="button button-small" data-action="<?php echo esc_attr( $recommendation['action'] ); ?>">
															<?php esc_html_e( 'Take Action', 'rank-math-pro' ); ?>
														</button>
													<?php endif; ?>
												</div>
											<?php endforeach; ?>
										</div>
									</div>
								</div>
							<?php endif; ?>
						</div>
					<?php else : ?>
						<div class="no-analysis">
							<p><?php esc_html_e( 'No analysis data available. Run an analysis to get started.', 'rank-math-pro' ); ?></p>
							<button type="button" class="button button-primary run-analysis">
								<?php esc_html_e( 'Run First Analysis', 'rank-math-pro' ); ?>
							</button>
						</div>
					<?php endif; ?>
				</div>
			</div>
		</div>

		<!-- Rankings Tab -->
		<div id="rankings" class="tab-content">
			<div class="rank-math-seo-bot-rankings">
				<div class="rankings-header">
					<h3><?php esc_html_e( 'Keyword Rankings', 'rank-math-pro' ); ?></h3>
					<button type="button" class="button button-primary check-rankings">
						<?php esc_html_e( 'Check Rankings', 'rank-math-pro' ); ?>
					</button>
				</div>

				<div class="rankings-content">
					<div class="rankings-summary">
						<?php if ( ! empty( $ranking_summary ) ) : ?>
							<div class="summary-stats">
								<div class="stat-item">
									<span class="stat-number"><?php echo esc_html( $ranking_summary['total_keywords'] ?? 0 ); ?></span>
									<span class="stat-label"><?php esc_html_e( 'Total Keywords', 'rank-math-pro' ); ?></span>
								</div>
								<div class="stat-item">
									<span class="stat-number"><?php echo esc_html( $ranking_summary['average_position'] ?? 0 ); ?></span>
									<span class="stat-label"><?php esc_html_e( 'Average Position', 'rank-math-pro' ); ?></span>
								</div>
								<div class="stat-item">
									<span class="stat-number improved"><?php echo esc_html( $ranking_summary['improved'] ?? 0 ); ?></span>
									<span class="stat-label"><?php esc_html_e( 'Improved', 'rank-math-pro' ); ?></span>
								</div>
								<div class="stat-item">
									<span class="stat-number dropped"><?php echo esc_html( $ranking_summary['dropped'] ?? 0 ); ?></span>
									<span class="stat-label"><?php esc_html_e( 'Dropped', 'rank-math-pro' ); ?></span>
								</div>
							</div>
						<?php endif; ?>
					</div>

					<div class="rankings-table">
						<table class="wp-list-table widefat fixed striped">
							<thead>
								<tr>
									<th><?php esc_html_e( 'Keyword', 'rank-math-pro' ); ?></th>
									<th><?php esc_html_e( 'Current Position', 'rank-math-pro' ); ?></th>
									<th><?php esc_html_e( 'Change', 'rank-math-pro' ); ?></th>
									<th><?php esc_html_e( 'Last Checked', 'rank-math-pro' ); ?></th>
									<th><?php esc_html_e( 'Actions', 'rank-math-pro' ); ?></th>
								</tr>
							</thead>
							<tbody>
								<tr class="no-data">
									<td colspan="5"><?php esc_html_e( 'No ranking data available. Check rankings to get started.', 'rank-math-pro' ); ?></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>

		<!-- Competitors Tab -->
		<div id="competitors" class="tab-content">
			<div class="rank-math-seo-bot-competitors">
				<div class="competitors-header">
					<h3><?php esc_html_e( 'Competitor Analysis', 'rank-math-pro' ); ?></h3>
					<button type="button" class="button button-primary analyze-competitors">
						<?php esc_html_e( 'Analyze Competitors', 'rank-math-pro' ); ?>
					</button>
				</div>

				<div class="competitors-content">
					<div class="competitors-list">
						<?php if ( ! empty( $competitor_summary ) && ! empty( $competitor_summary['analysis'] ) ) : ?>
							<?php foreach ( $competitor_summary['analysis'] as $url => $analysis ) : ?>
								<div class="competitor-item">
									<div class="competitor-header">
										<h4><?php echo esc_html( $analysis['domain'] ?? $url ); ?></h4>
										<span class="competitor-status status-<?php echo esc_attr( $analysis['status'] ?? 'unknown' ); ?>">
											<?php echo esc_html( ucfirst( $analysis['status'] ?? 'unknown' ) ); ?>
										</span>
									</div>
									<div class="competitor-details">
										<?php if ( isset( $analysis['technical'] ) ) : ?>
											<div class="technical-summary">
												<h5><?php esc_html_e( 'Technical SEO', 'rank-math-pro' ); ?></h5>
												<div class="technical-stats">
													<?php if ( isset( $analysis['technical']['site_speed']['score'] ) ) : ?>
														<div class="stat-item">
															<span class="stat-label"><?php esc_html_e( 'Site Speed:', 'rank-math-pro' ); ?></span>
															<span class="stat-value"><?php echo esc_html( $analysis['technical']['site_speed']['score'] ); ?></span>
														</div>
													<?php endif; ?>
													<?php if ( isset( $analysis['technical']['mobile_friendly']['score'] ) ) : ?>
														<div class="stat-item">
															<span class="stat-label"><?php esc_html_e( 'Mobile Score:', 'rank-math-pro' ); ?></span>
															<span class="stat-value"><?php echo esc_html( $analysis['technical']['mobile_friendly']['score'] ); ?></span>
														</div>
													<?php endif; ?>
												</div>
											</div>
										<?php endif; ?>
									</div>
								</div>
							<?php endforeach; ?>
						<?php else : ?>
							<div class="no-competitors">
								<p><?php esc_html_e( 'No competitor data available. Add competitor URLs in configuration and run analysis.', 'rank-math-pro' ); ?></p>
							</div>
						<?php endif; ?>
					</div>
				</div>
			</div>
		</div>

		<!-- Reports Tab -->
		<div id="reports" class="tab-content">
			<div class="rank-math-seo-bot-reports">
				<div class="reports-header">
					<h3><?php esc_html_e( 'SEO Reports', 'rank-math-pro' ); ?></h3>
					<button type="button" class="button button-primary generate-report">
						<?php esc_html_e( 'Generate Report', 'rank-math-pro' ); ?>
					</button>
				</div>

				<div class="reports-content">
					<div class="reports-list">
						<div class="report-item">
							<h4><?php esc_html_e( 'Weekly SEO Report', 'rank-math-pro' ); ?></h4>
							<p><?php esc_html_e( 'Comprehensive weekly analysis of your SEO performance.', 'rank-math-pro' ); ?></p>
							<button type="button" class="button generate-weekly-report">
								<?php esc_html_e( 'Generate Weekly Report', 'rank-math-pro' ); ?>
							</button>
						</div>

						<div class="report-item">
							<h4><?php esc_html_e( 'Monthly SEO Report', 'rank-math-pro' ); ?></h4>
							<p><?php esc_html_e( 'Detailed monthly analysis with trends and recommendations.', 'rank-math-pro' ); ?></p>
							<button type="button" class="button generate-monthly-report">
								<?php esc_html_e( 'Generate Monthly Report', 'rank-math-pro' ); ?>
							</button>
						</div>

						<div class="report-item">
							<h4><?php esc_html_e( 'Competitor Analysis Report', 'rank-math-pro' ); ?></h4>
							<p><?php esc_html_e( 'In-depth analysis of your competitors and opportunities.', 'rank-math-pro' ); ?></p>
							<button type="button" class="button generate-competitor-report">
								<?php esc_html_e( 'Generate Competitor Report', 'rank-math-pro' ); ?>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Loading Overlay -->
<div id="seo-bot-loading" class="seo-bot-loading-overlay" style="display: none;">
	<div class="loading-content">
		<div class="loading-spinner"></div>
		<p class="loading-text"><?php esc_html_e( 'Processing...', 'rank-math-pro' ); ?></p>
	</div>
</div>

<!-- Success/Error Messages -->
<div id="seo-bot-messages" class="seo-bot-messages"></div>
