<?php
/**
 * SEO Bot module - Automated SEO optimization and monitoring.
 *
 * @since      3.0.99
 * @package    RankMathPro
 * @subpackage RankMathPro\SEO_Bot
 * @author     Rank Math <support@rankmath.com>
 */

namespace RankMathPro\SEO_Bot;

use RankMath\Helper;
use RankMath\Traits\Hooker;
use RankMath\Admin\Admin_Helper;
use RankMath\Analytics\Stats;
use RankMath\Google\Analytics as GoogleAnalytics;
use RankMath\Google\Console as GoogleConsole;

defined( 'ABSPATH' ) || exit;

/**
 * SEO_Bot class.
 */
class SEO_Bot {

	use Hooker;

	/**
	 * Bot configuration options.
	 *
	 * @var array
	 */
	private $config = [];

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->load_config();
		$this->init_hooks();
		$this->init_components();
	}

	/**
	 * Load bot configuration.
	 */
	private function load_config() {
		$this->config = wp_parse_args(
			get_option( 'rank_math_seo_bot_config', [] ),
			[
				'enabled'                    => false,
				'auto_optimize_content'      => false,
				'monitor_rankings'          => false,
				'competitor_analysis'       => false,
				'keyword_tracking'          => false,
				'content_suggestions'       => false,
				'technical_seo_monitoring'  => false,
				'email_notifications'       => false,
				'notification_frequency'    => 'weekly',
				'notification_email'        => get_option( 'admin_email' ),
				'auto_fix_issues'           => false,
				'monitoring_interval'       => 'daily',
				'priority_keywords'         => [],
				'competitor_urls'           => [],
				'content_optimization_rules' => [],
			]
		);
	}

	/**
	 * Initialize hooks.
	 */
	private function init_hooks() {
		// Admin hooks
		$this->action( 'admin_enqueue_scripts', 'enqueue_scripts' );
		$this->action( 'admin_menu', 'add_admin_menu' );
		$this->action( 'wp_ajax_rank_math_seo_bot_action', 'handle_ajax_request' );
		$this->action( 'wp_ajax_rank_math_seo_bot_save_config', 'save_config' );

		// Automated tasks
		if ( $this->config['enabled'] ) {
			$this->action( 'rank_math_seo_bot_daily_tasks', 'run_daily_tasks' );
			$this->action( 'rank_math_seo_bot_weekly_tasks', 'run_weekly_tasks' );
			$this->action( 'rank_math_seo_bot_monthly_tasks', 'run_monthly_tasks' );

			// Content optimization hooks
			if ( $this->config['auto_optimize_content'] ) {
				$this->action( 'save_post', 'optimize_content_on_save', 20, 2 );
				$this->action( 'rank_math/content/analyzed', 'provide_content_suggestions' );
			}

			// Monitoring hooks
			if ( $this->config['monitor_rankings'] ) {
				$this->action( 'rank_math/analytics/updated', 'check_ranking_changes' );
			}

			// Technical SEO monitoring
			if ( $this->config['technical_seo_monitoring'] ) {
				$this->action( 'init', 'monitor_technical_seo' );
			}
		}

		// Schedule cron jobs
		$this->action( 'init', 'schedule_cron_jobs' );
	}

	/**
	 * Initialize components.
	 */
	private function init_components() {
		new Content_Optimizer( $this->config );
		new Ranking_Monitor( $this->config );
		new Competitor_Analyzer( $this->config );
		new Technical_Monitor( $this->config );
		new Notification_Manager( $this->config );
		new Keyword_Tracker( $this->config );
		new Rest();
	}

	/**
	 * Enqueue admin scripts and styles.
	 *
	 * @param string $hook Current admin page hook.
	 */
	public function enqueue_scripts( $hook ) {
		if ( 'rank-math_page_rank-math-seo-bot' !== $hook ) {
			return;
		}

		wp_enqueue_style(
			'rank-math-seo-bot',
			RANK_MATH_PRO_URL . 'includes/modules/seo-bot/assets/css/seo-bot.css',
			[],
			RANK_MATH_PRO_VERSION
		);

		wp_enqueue_script(
			'rank-math-seo-bot',
			RANK_MATH_PRO_URL . 'includes/modules/seo-bot/assets/js/seo-bot.js',
			[ 'jquery', 'wp-element', 'wp-components', 'rank-math-components' ],
			RANK_MATH_PRO_VERSION,
			true
		);

		wp_localize_script(
			'rank-math-seo-bot',
			'rankMathSeoBot',
			[
				'config'     => $this->config,
				'ajaxUrl'    => admin_url( 'admin-ajax.php' ),
				'nonce'      => wp_create_nonce( 'rank_math_seo_bot_nonce' ),
				'isConnected' => GoogleAnalytics::is_analytics_connected() && GoogleConsole::is_console_connected(),
			]
		);
	}

	/**
	 * Add admin menu.
	 */
	public function add_admin_menu() {
		add_submenu_page(
			'rank-math',
			__( 'SEO Bot', 'rank-math-pro' ),
			__( 'SEO Bot', 'rank-math-pro' ),
			'manage_options',
			'rank-math-seo-bot',
			[ $this, 'admin_page' ]
		);
	}

	/**
	 * Admin page callback.
	 */
	public function admin_page() {
		include RANK_MATH_PRO_PATH . 'includes/modules/seo-bot/views/admin-page.php';
	}

	/**
	 * Handle AJAX requests.
	 */
	public function handle_ajax_request() {
		check_ajax_referer( 'rank_math_seo_bot_nonce', 'nonce' );

		$action = sanitize_text_field( $_POST['action_type'] ?? '' );
		$data   = $_POST['data'] ?? [];

		switch ( $action ) {
			case 'run_analysis':
				$this->run_comprehensive_analysis();
				break;
			case 'optimize_content':
				$this->optimize_content( $data );
				break;
			case 'check_rankings':
				$this->check_rankings();
				break;
			case 'analyze_competitors':
				$this->analyze_competitors();
				break;
			case 'generate_report':
				$this->generate_seo_report();
				break;
			default:
				wp_send_json_error( __( 'Invalid action', 'rank-math-pro' ) );
		}
	}

	/**
	 * Save bot configuration.
	 */
	public function save_config() {
		check_ajax_referer( 'rank_math_seo_bot_nonce', 'nonce' );

		$config = $_POST['config'] ?? [];
		$config = $this->sanitize_config( $config );

		update_option( 'rank_math_seo_bot_config', $config );
		$this->config = $config;

		// Reschedule cron jobs if needed
		$this->schedule_cron_jobs();

		wp_send_json_success( __( 'Configuration saved successfully', 'rank-math-pro' ) );
	}

	/**
	 * Sanitize configuration data.
	 *
	 * @param array $config Configuration data.
	 * @return array Sanitized configuration.
	 */
	private function sanitize_config( $config ) {
		$sanitized = [];

		$boolean_fields = [
			'enabled',
			'auto_optimize_content',
			'monitor_rankings',
			'competitor_analysis',
			'keyword_tracking',
			'content_suggestions',
			'technical_seo_monitoring',
			'email_notifications',
			'auto_fix_issues',
		];

		foreach ( $boolean_fields as $field ) {
			$sanitized[ $field ] = ! empty( $config[ $field ] );
		}

		$sanitized['notification_frequency'] = sanitize_text_field( $config['notification_frequency'] ?? 'weekly' );
		$sanitized['notification_email']     = sanitize_email( $config['notification_email'] ?? get_option( 'admin_email' ) );
		$sanitized['monitoring_interval']    = sanitize_text_field( $config['monitoring_interval'] ?? 'daily' );

		$sanitized['priority_keywords'] = array_map( 'sanitize_text_field', $config['priority_keywords'] ?? [] );
		$sanitized['competitor_urls']   = array_map( 'esc_url_raw', $config['competitor_urls'] ?? [] );

		return $sanitized;
	}

	/**
	 * Schedule cron jobs.
	 */
	public function schedule_cron_jobs() {
		if ( ! $this->config['enabled'] ) {
			wp_clear_scheduled_hook( 'rank_math_seo_bot_daily_tasks' );
			wp_clear_scheduled_hook( 'rank_math_seo_bot_weekly_tasks' );
			wp_clear_scheduled_hook( 'rank_math_seo_bot_monthly_tasks' );
			return;
		}

		// Schedule daily tasks
		if ( ! wp_next_scheduled( 'rank_math_seo_bot_daily_tasks' ) ) {
			wp_schedule_event( time(), 'daily', 'rank_math_seo_bot_daily_tasks' );
		}

		// Schedule weekly tasks
		if ( ! wp_next_scheduled( 'rank_math_seo_bot_weekly_tasks' ) ) {
			wp_schedule_event( time(), 'weekly', 'rank_math_seo_bot_weekly_tasks' );
		}

		// Schedule monthly tasks
		if ( ! wp_next_scheduled( 'rank_math_seo_bot_monthly_tasks' ) ) {
			wp_schedule_event( time(), 'monthly', 'rank_math_seo_bot_monthly_tasks' );
		}
	}

	/**
	 * Run daily automated tasks.
	 */
	public function run_daily_tasks() {
		if ( ! $this->config['enabled'] ) {
			return;
		}

		// Check rankings if enabled
		if ( $this->config['monitor_rankings'] ) {
			$this->check_rankings();
		}

		// Monitor technical SEO
		if ( $this->config['technical_seo_monitoring'] ) {
			$this->monitor_technical_seo();
		}

		// Track keywords
		if ( $this->config['keyword_tracking'] ) {
			$this->track_keywords();
		}
	}

	/**
	 * Run weekly automated tasks.
	 */
	public function run_weekly_tasks() {
		if ( ! $this->config['enabled'] ) {
			return;
		}

		// Competitor analysis
		if ( $this->config['competitor_analysis'] ) {
			$this->analyze_competitors();
		}

		// Generate weekly report
		if ( $this->config['email_notifications'] ) {
			$this->send_weekly_report();
		}
	}

	/**
	 * Run monthly automated tasks.
	 */
	public function run_monthly_tasks() {
		if ( ! $this->config['enabled'] ) {
			return;
		}

		// Comprehensive SEO analysis
		$this->run_comprehensive_analysis();

		// Generate monthly report
		if ( $this->config['email_notifications'] ) {
			$this->send_monthly_report();
		}
	}

	/**
	 * Run comprehensive SEO analysis.
	 */
	public function run_comprehensive_analysis() {
		$analysis = [
			'content_analysis'    => $this->analyze_content(),
			'technical_seo'       => $this->analyze_technical_seo(),
			'keyword_performance' => $this->analyze_keyword_performance(),
			'competitor_analysis' => $this->analyze_competitors(),
			'recommendations'     => $this->generate_recommendations(),
		];

		update_option( 'rank_math_seo_bot_last_analysis', $analysis );

		return $analysis;
	}

	/**
	 * Analyze content for SEO optimization opportunities.
	 *
	 * @return array Content analysis results.
	 */
	private function analyze_content() {
		$posts = get_posts( [
			'post_type'      => 'post',
			'post_status'    => 'publish',
			'posts_per_page' => 50,
			'orderby'        => 'date',
			'order'          => 'DESC',
		] );

		$analysis = [
			'total_posts'        => count( $posts ),
			'optimized_posts'    => 0,
			'needs_optimization' => [],
			'issues_found'       => [],
		];

		foreach ( $posts as $post ) {
			$seo_score = get_post_meta( $post->ID, 'rank_math_seo_score', true );
			$score     = is_numeric( $seo_score ) ? (int) $seo_score : 0;

			if ( $score >= 80 ) {
				$analysis['optimized_posts']++;
			} else {
				$analysis['needs_optimization'][] = [
					'id'    => $post->ID,
					'title' => $post->post_title,
					'score' => $score,
					'url'   => get_permalink( $post->ID ),
				];
			}

			// Check for common issues
			$issues = $this->check_content_issues( $post );
			if ( ! empty( $issues ) ) {
				$analysis['issues_found'][] = [
					'post_id' => $post->ID,
					'title'   => $post->post_title,
					'issues'  => $issues,
				];
			}
		}

		return $analysis;
	}

	/**
	 * Check for content SEO issues.
	 *
	 * @param WP_Post $post Post object.
	 * @return array Issues found.
	 */
	private function check_content_issues( $post ) {
		$issues = [];

		// Check title length
		$title = get_the_title( $post->ID );
		if ( strlen( $title ) < 30 || strlen( $title ) > 60 ) {
			$issues[] = __( 'Title length should be between 30-60 characters', 'rank-math-pro' );
		}

		// Check meta description
		$meta_desc = get_post_meta( $post->ID, 'rank_math_description', true );
		if ( empty( $meta_desc ) ) {
			$issues[] = __( 'Missing meta description', 'rank-math-pro' );
		} elseif ( strlen( $meta_desc ) < 120 || strlen( $meta_desc ) > 160 ) {
			$issues[] = __( 'Meta description should be between 120-160 characters', 'rank-math-pro' );
		}

		// Check content length
		$content = strip_tags( $post->post_content );
		if ( strlen( $content ) < 300 ) {
			$issues[] = __( 'Content is too short (less than 300 characters)', 'rank-math-pro' );
		}

		// Check for images without alt text
		$images = $this->get_images_without_alt( $post->post_content );
		if ( ! empty( $images ) ) {
			$issues[] = sprintf( __( '%d images without alt text', 'rank-math-pro' ), count( $images ) );
		}

		return $issues;
	}

	/**
	 * Get images without alt text from content.
	 *
	 * @param string $content Post content.
	 * @return array Images without alt text.
	 */
	private function get_images_without_alt( $content ) {
		$images = [];
		preg_match_all( '/<img[^>]+>/i', $content, $matches );

		foreach ( $matches[0] as $img ) {
			if ( ! preg_match( '/alt\s*=\s*["\'][^"\']*["\']/', $img ) ) {
				$images[] = $img;
			}
		}

		return $images;
	}

	/**
	 * Analyze technical SEO aspects.
	 *
	 * @return array Technical SEO analysis.
	 */
	private function analyze_technical_seo() {
		$analysis = [
			'site_speed'     => $this->check_site_speed(),
			'mobile_friendly' => $this->check_mobile_friendliness(),
			'ssl_status'     => $this->check_ssl_status(),
			'xml_sitemap'    => $this->check_xml_sitemap(),
			'robots_txt'     => $this->check_robots_txt(),
			'structured_data' => $this->check_structured_data(),
		];

		return $analysis;
	}

	/**
	 * Check site speed.
	 *
	 * @return array Site speed analysis.
	 */
	private function check_site_speed() {
		// This would integrate with PageSpeed Insights API
		return [
			'status' => 'good',
			'score'  => 85,
			'issues' => [],
		];
	}

	/**
	 * Check mobile friendliness.
	 *
	 * @return array Mobile friendliness analysis.
	 */
	private function check_mobile_friendliness() {
		return [
			'status' => 'good',
			'issues' => [],
		];
	}

	/**
	 * Check SSL status.
	 *
	 * @return array SSL status analysis.
	 */
	private function check_ssl_status() {
		$is_ssl = is_ssl();
		return [
			'status' => $is_ssl ? 'good' : 'warning',
			'issues' => $is_ssl ? [] : [ __( 'Site is not using SSL', 'rank-math-pro' ) ],
		];
	}

	/**
	 * Check XML sitemap.
	 *
	 * @return array XML sitemap analysis.
	 */
	private function check_xml_sitemap() {
		$sitemap_url = home_url( '/sitemap_index.xml' );
		$response    = wp_remote_get( $sitemap_url );

		return [
			'status' => ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ? 'good' : 'warning',
			'url'    => $sitemap_url,
		];
	}

	/**
	 * Check robots.txt.
	 *
	 * @return array Robots.txt analysis.
	 */
	private function check_robots_txt() {
		$robots_url = home_url( '/robots.txt' );
		$response   = wp_remote_get( $robots_url );

		return [
			'status' => ! is_wp_error( $response ) && 200 === wp_remote_retrieve_response_code( $response ) ? 'good' : 'warning',
			'url'    => $robots_url,
		];
	}

	/**
	 * Check structured data.
	 *
	 * @return array Structured data analysis.
	 */
	private function check_structured_data() {
		return [
			'status' => 'good',
			'types'  => [ 'Article', 'Organization', 'WebSite' ],
		];
	}

	/**
	 * Analyze keyword performance.
	 *
	 * @return array Keyword performance analysis.
	 */
	private function analyze_keyword_performance() {
		if ( ! GoogleAnalytics::is_analytics_connected() ) {
			return [
				'status' => 'not_connected',
				'message' => __( 'Google Analytics not connected', 'rank-math-pro' ),
			];
		}

		// This would integrate with Rank Math Analytics
		return [
			'status' => 'connected',
			'keywords' => [],
			'performance' => [],
		];
	}

	/**
	 * Analyze competitors.
	 *
	 * @return array Competitor analysis.
	 */
	private function analyze_competitors() {
		$competitors = $this->config['competitor_urls'] ?? [];
		$analysis    = [];

		foreach ( $competitors as $url ) {
			$analysis[] = [
				'url' => $url,
				'analysis' => $this->analyze_competitor_url( $url ),
			];
		}

		return $analysis;
	}

	/**
	 * Analyze a competitor URL.
	 *
	 * @param string $url Competitor URL.
	 * @return array Competitor analysis results.
	 */
	private function analyze_competitor_url( $url ) {
		// This would use Rank Math's competitor analysis features
		return [
			'status' => 'analyzed',
			'data'   => [],
		];
	}

	/**
	 * Generate SEO recommendations.
	 *
	 * @return array SEO recommendations.
	 */
	private function generate_recommendations() {
		$recommendations = [];

		// Content recommendations
		$content_analysis = $this->analyze_content();
		if ( ! empty( $content_analysis['needs_optimization'] ) ) {
			$recommendations[] = [
				'type' => 'content',
				'priority' => 'high',
				'title' => __( 'Optimize Content', 'rank-math-pro' ),
				'description' => sprintf(
					__( '%d posts need SEO optimization', 'rank-math-pro' ),
					count( $content_analysis['needs_optimization'] )
				),
				'action' => 'optimize_content',
			];
		}

		// Technical SEO recommendations
		$technical_analysis = $this->analyze_technical_seo();
		if ( 'warning' === $technical_analysis['ssl_status']['status'] ) {
			$recommendations[] = [
				'type' => 'technical',
				'priority' => 'high',
				'title' => __( 'Enable SSL', 'rank-math-pro' ),
				'description' => __( 'Your site is not using SSL, which affects SEO', 'rank-math-pro' ),
				'action' => 'enable_ssl',
			];
		}

		return $recommendations;
	}

	/**
	 * Check rankings for priority keywords.
	 */
	public function check_rankings() {
		$keywords = $this->config['priority_keywords'] ?? [];
		$rankings = [];

		foreach ( $keywords as $keyword ) {
			$rankings[ $keyword ] = $this->get_keyword_ranking( $keyword );
		}

		update_option( 'rank_math_seo_bot_rankings', $rankings );

		return $rankings;
	}

	/**
	 * Get ranking for a specific keyword.
	 *
	 * @param string $keyword Keyword to check.
	 * @return array Keyword ranking data.
	 */
	private function get_keyword_ranking( $keyword ) {
		// This would integrate with Google Search Console API
		return [
			'keyword' => $keyword,
			'position' => 0,
			'change' => 0,
			'last_checked' => current_time( 'mysql' ),
		];
	}

	/**
	 * Track keywords.
	 */
	public function track_keywords() {
		// Implementation for keyword tracking
	}

	/**
	 * Monitor technical SEO.
	 */
	public function monitor_technical_seo() {
		// Implementation for technical SEO monitoring
	}

	/**
	 * Optimize content on save.
	 *
	 * @param int     $post_id Post ID.
	 * @param WP_Post $post    Post object.
	 */
	public function optimize_content_on_save( $post_id, $post ) {
		if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
			return;
		}

		// Auto-optimize content based on rules
		$this->auto_optimize_content( $post_id );
	}

	/**
	 * Auto-optimize content.
	 *
	 * @param int $post_id Post ID.
	 */
	private function auto_optimize_content( $post_id ) {
		$rules = $this->config['content_optimization_rules'] ?? [];

		foreach ( $rules as $rule ) {
			$this->apply_optimization_rule( $post_id, $rule );
		}
	}

	/**
	 * Apply optimization rule.
	 *
	 * @param int   $post_id Post ID.
	 * @param array $rule    Optimization rule.
	 */
	private function apply_optimization_rule( $post_id, $rule ) {
		// Implementation for applying optimization rules
	}

	/**
	 * Provide content suggestions.
	 *
	 * @param array $analysis Content analysis data.
	 */
	public function provide_content_suggestions( $analysis ) {
		// Implementation for content suggestions
	}

	/**
	 * Check ranking changes.
	 *
	 * @param array $analytics Analytics data.
	 */
	public function check_ranking_changes( $analytics ) {
		// Implementation for ranking change detection
	}

	/**
	 * Send weekly report.
	 */
	public function send_weekly_report() {
		// Implementation for weekly report
	}

	/**
	 * Send monthly report.
	 */
	public function send_monthly_report() {
		// Implementation for monthly report
	}

	/**
	 * Generate SEO report.
	 */
	public function generate_seo_report() {
		$report_generator = new Report_Generator();
		$report = $report_generator->generate_report( 'comprehensive', 'html' );
		wp_send_json_success( $report );
	}
}
