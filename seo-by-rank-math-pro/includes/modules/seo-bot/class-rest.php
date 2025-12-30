<?php
/**
 * REST API endpoints for SEO Bot.
 *
 * @since      3.0.99
 * @package    RankMathPro
 * @subpackage RankMathPro\SEO_Bot
 * @author     Rank Math <support@rankmath.com>
 */

namespace RankMathPro\SEO_Bot;

use RankMath\Helper;
use RankMath\Traits\Hooker;
use WP_REST_Controller;
use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;

defined( 'ABSPATH' ) || exit;

/**
 * REST API controller for SEO Bot.
 */
class Rest extends WP_REST_Controller {

	use Hooker;

	/**
	 * The namespace of this controller's route.
	 *
	 * @var string
	 */
	protected $namespace = 'rank-math-pro/v1';

	/**
	 * The base of this controller's route.
	 *
	 * @var string
	 */
	protected $rest_base = 'seo-bot';

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->register_routes();
	}

	/**
	 * Register the routes for the objects of the controller.
	 */
	public function register_routes() {
		// Bot configuration
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/config',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_config' ],
					'permission_callback' => [ $this, 'get_config_permission_check' ],
				],
				[
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ $this, 'update_config' ],
					'permission_callback' => [ $this, 'update_config_permission_check' ],
					'args'                => $this->get_config_args(),
				],
			]
		);

		// Bot status
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/status',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_status' ],
					'permission_callback' => [ $this, 'get_status_permission_check' ],
				],
			]
		);

		// Run analysis
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/analysis',
			[
				[
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ $this, 'run_analysis' ],
					'permission_callback' => [ $this, 'run_analysis_permission_check' ],
					'args'                => [
						'type' => [
							'type'        => 'string',
							'description' => __( 'Type of analysis to run', 'rank-math-pro' ),
							'enum'        => [ 'content', 'technical', 'comprehensive' ],
							'default'     => 'comprehensive',
						],
					],
				],
			]
		);

		// Get analysis results
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/analysis/(?P<id>[a-zA-Z0-9-]+)',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_analysis' ],
					'permission_callback' => [ $this, 'get_analysis_permission_check' ],
				],
			]
		);

		// Rankings
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/rankings',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_rankings' ],
					'permission_callback' => [ $this, 'get_rankings_permission_check' ],
					'args'                => [
						'keyword' => [
							'type'        => 'string',
							'description' => __( 'Specific keyword to get ranking for', 'rank-math-pro' ),
						],
						'limit'   => [
							'type'        => 'integer',
							'description' => __( 'Number of rankings to return', 'rank-math-pro' ),
							'default'     => 50,
						],
					],
				],
				[
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ $this, 'check_rankings' ],
					'permission_callback' => [ $this, 'check_rankings_permission_check' ],
				],
			]
		);

		// Competitors
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/competitors',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_competitors' ],
					'permission_callback' => [ $this, 'get_competitors_permission_check' ],
				],
				[
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ $this, 'analyze_competitors' ],
					'permission_callback' => [ $this, 'analyze_competitors_permission_check' ],
				],
			]
		);

		// Reports
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/reports',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_reports' ],
					'permission_callback' => [ $this, 'get_reports_permission_check' ],
				],
				[
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ $this, 'generate_report' ],
					'permission_callback' => [ $this, 'generate_report_permission_check' ],
					'args'                => [
						'type' => [
							'type'        => 'string',
							'description' => __( 'Type of report to generate', 'rank-math-pro' ),
							'enum'        => [ 'weekly', 'monthly', 'competitor', 'custom' ],
							'default'     => 'weekly',
						],
						'format' => [
							'type'        => 'string',
							'description' => __( 'Report format', 'rank-math-pro' ),
							'enum'        => [ 'html', 'pdf', 'csv' ],
							'default'     => 'html',
						],
					],
				],
			]
		);

		// Content optimization
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/content/(?P<id>\d+)',
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_content_analysis' ],
					'permission_callback' => [ $this, 'get_content_analysis_permission_check' ],
				],
				[
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ $this, 'optimize_content' ],
					'permission_callback' => [ $this, 'optimize_content_permission_check' ],
					'args'                => [
						'optimizations' => [
							'type'        => 'array',
							'description' => __( 'List of optimizations to apply', 'rank-math-pro' ),
							'items'       => [
								'type' => 'string',
								'enum' => [ 'title', 'description', 'keywords', 'structure' ],
							],
						],
					],
				],
			]
		);

		// Technical SEO check
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/technical-seo',
			[
				[
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ $this, 'check_technical_seo' ],
					'permission_callback' => [ $this, 'check_technical_seo_permission_check' ],
				],
			]
		);

		// Bot actions
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/actions',
			[
				[
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ $this, 'execute_action' ],
					'permission_callback' => [ $this, 'execute_action_permission_check' ],
					'args'                => [
						'action' => [
							'type'        => 'string',
							'description' => __( 'Action to execute', 'rank-math-pro' ),
							'required'    => true,
							'enum'        => [
								'enable',
								'disable',
								'run_daily_tasks',
								'run_weekly_tasks',
								'run_monthly_tasks',
								'clear_cache',
								'reset_data',
							],
						],
					],
				],
			]
		);
	}

	/**
	 * Get bot configuration.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function get_config( $request ) {
		$config = get_option( 'rank_math_seo_bot_config', [] );
		
		return new WP_REST_Response( $config, 200 );
	}

	/**
	 * Update bot configuration.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function update_config( $request ) {
		$config = $request->get_json_params();
		
		// Sanitize configuration
		$sanitized_config = $this->sanitize_config( $config );
		
		// Save configuration
		update_option( 'rank_math_seo_bot_config', $sanitized_config );
		
		// Reschedule cron jobs if needed
		$this->reschedule_cron_jobs( $sanitized_config );
		
		return new WP_REST_Response( [
			'success' => true,
			'message' => __( 'Configuration updated successfully', 'rank-math-pro' ),
			'config'  => $sanitized_config,
		], 200 );
	}

	/**
	 * Get bot status.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function get_status( $request ) {
		$config = get_option( 'rank_math_seo_bot_config', [] );
		$last_analysis = get_option( 'rank_math_seo_bot_last_analysis', [] );
		$ranking_summary = get_option( 'rank_math_seo_bot_ranking_summary', [] );
		$competitor_summary = get_option( 'rank_math_seo_bot_competitor_summary', [] );
		
		$status = [
			'enabled' => ! empty( $config['enabled'] ),
			'last_analysis' => $last_analysis,
			'ranking_summary' => $ranking_summary,
			'competitor_summary' => $competitor_summary,
			'cron_jobs' => [
				'daily' => wp_next_scheduled( 'rank_math_seo_bot_daily_tasks' ),
				'weekly' => wp_next_scheduled( 'rank_math_seo_bot_weekly_tasks' ),
				'monthly' => wp_next_scheduled( 'rank_math_seo_bot_monthly_tasks' ),
			],
		];
		
		return new WP_REST_Response( $status, 200 );
	}

	/**
	 * Run SEO analysis.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function run_analysis( $request ) {
		$type = $request->get_param( 'type' );
		$seo_bot = new SEO_Bot();
		
		switch ( $type ) {
			case 'content':
				$results = $seo_bot->analyze_content();
				break;
			case 'technical':
				$results = $seo_bot->analyze_technical_seo();
				break;
			case 'comprehensive':
			default:
				$results = $seo_bot->run_comprehensive_analysis();
				break;
		}
		
		// Store analysis results
		$analysis_id = 'analysis_' . time();
		update_option( 'rank_math_seo_bot_analysis_' . $analysis_id, $results );
		
		return new WP_REST_Response( [
			'success' => true,
			'analysis_id' => $analysis_id,
			'results' => $results,
		], 200 );
	}

	/**
	 * Get analysis results.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function get_analysis( $request ) {
		$analysis_id = $request->get_param( 'id' );
		$results = get_option( 'rank_math_seo_bot_analysis_' . $analysis_id, false );
		
		if ( false === $results ) {
			return new WP_Error(
				'analysis_not_found',
				__( 'Analysis not found', 'rank-math-pro' ),
				[ 'status' => 404 ]
			);
		}
		
		return new WP_REST_Response( $results, 200 );
	}

	/**
	 * Get rankings data.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function get_rankings( $request ) {
		$keyword = $request->get_param( 'keyword' );
		$limit = $request->get_param( 'limit' );
		
		$current_rankings = get_option( 'rank_math_seo_bot_current_rankings', [] );
		
		if ( $keyword ) {
			$rankings = isset( $current_rankings[ $keyword ] ) ? [ $current_rankings[ $keyword ] ] : [];
		} else {
			$rankings = array_slice( $current_rankings, 0, $limit, true );
		}
		
		return new WP_REST_Response( $rankings, 200 );
	}

	/**
	 * Check rankings.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function check_rankings( $request ) {
		$ranking_monitor = new Ranking_Monitor( get_option( 'rank_math_seo_bot_config', [] ) );
		$rankings = $ranking_monitor->check_rankings();
		
		return new WP_REST_Response( [
			'success' => true,
			'rankings' => $rankings,
		], 200 );
	}

	/**
	 * Get competitors data.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function get_competitors( $request ) {
		$competitor_summary = get_option( 'rank_math_seo_bot_competitor_summary', [] );
		
		return new WP_REST_Response( $competitor_summary, 200 );
	}

	/**
	 * Analyze competitors.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function analyze_competitors( $request ) {
		$competitor_analyzer = new Competitor_Analyzer( get_option( 'rank_math_seo_bot_config', [] ) );
		$results = $competitor_analyzer->analyze_competitors();
		
		return new WP_REST_Response( [
			'success' => true,
			'results' => $results,
		], 200 );
	}

	/**
	 * Get reports.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function get_reports( $request ) {
		$reports = get_option( 'rank_math_seo_bot_reports', [] );
		
		return new WP_REST_Response( $reports, 200 );
	}

	/**
	 * Generate report.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function generate_report( $request ) {
		$type = $request->get_param( 'type' );
		$format = $request->get_param( 'format' );
		
		$report_generator = new Report_Generator();
		$report = $report_generator->generate_report( $type, $format );
		
		return new WP_REST_Response( [
			'success' => true,
			'report' => $report,
		], 200 );
	}

	/**
	 * Get content analysis.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function get_content_analysis( $request ) {
		$post_id = $request->get_param( 'id' );
		$content_optimizer = new Content_Optimizer( get_option( 'rank_math_seo_bot_config', [] ) );
		$analysis = $content_optimizer->get_content_analysis( $post_id );
		
		return new WP_REST_Response( $analysis, 200 );
	}

	/**
	 * Optimize content.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function optimize_content( $request ) {
		$post_id = $request->get_param( 'id' );
		$optimizations = $request->get_param( 'optimizations' );
		
		$content_optimizer = new Content_Optimizer( get_option( 'rank_math_seo_bot_config', [] ) );
		$results = $content_optimizer->apply_optimizations( $post_id, $optimizations );
		
		return new WP_REST_Response( [
			'success' => true,
			'results' => $results,
		], 200 );
	}

	/**
	 * Check technical SEO.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function check_technical_seo( $request ) {
		$technical_monitor = new Technical_Monitor( get_option( 'rank_math_seo_bot_config', [] ) );
		$results = $technical_monitor->run_technical_check();
		
		return new WP_REST_Response( [
			'success' => true,
			'results' => $results,
		], 200 );
	}

	/**
	 * Execute bot action.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_REST_Response|WP_Error
	 */
	public function execute_action( $request ) {
		$action = $request->get_param( 'action' );
		$seo_bot = new SEO_Bot();
		
		switch ( $action ) {
			case 'enable':
				$config = get_option( 'rank_math_seo_bot_config', [] );
				$config['enabled'] = true;
				update_option( 'rank_math_seo_bot_config', $config );
				$seo_bot->schedule_cron_jobs();
				break;
				
			case 'disable':
				$config = get_option( 'rank_math_seo_bot_config', [] );
				$config['enabled'] = false;
				update_option( 'rank_math_seo_bot_config', $config );
				wp_clear_scheduled_hook( 'rank_math_seo_bot_daily_tasks' );
				wp_clear_scheduled_hook( 'rank_math_seo_bot_weekly_tasks' );
				wp_clear_scheduled_hook( 'rank_math_seo_bot_monthly_tasks' );
				break;
				
			case 'run_daily_tasks':
				$seo_bot->run_daily_tasks();
				break;
				
			case 'run_weekly_tasks':
				$seo_bot->run_weekly_tasks();
				break;
				
			case 'run_monthly_tasks':
				$seo_bot->run_monthly_tasks();
				break;
				
			case 'clear_cache':
				$this->clear_bot_cache();
				break;
				
			case 'reset_data':
				$this->reset_bot_data();
				break;
				
			default:
				return new WP_Error(
					'invalid_action',
					__( 'Invalid action', 'rank-math-pro' ),
					[ 'status' => 400 ]
				);
		}
		
		return new WP_REST_Response( [
			'success' => true,
			'message' => sprintf( __( 'Action "%s" executed successfully', 'rank-math-pro' ), $action ),
		], 200 );
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
		$sanitized['notification_email'] = sanitize_email( $config['notification_email'] ?? get_option( 'admin_email' ) );
		$sanitized['monitoring_interval'] = sanitize_text_field( $config['monitoring_interval'] ?? 'daily' );
		
		$sanitized['priority_keywords'] = array_map( 'sanitize_text_field', $config['priority_keywords'] ?? [] );
		$sanitized['competitor_urls'] = array_map( 'esc_url_raw', $config['competitor_urls'] ?? [] );
		
		return $sanitized;
	}

	/**
	 * Reschedule cron jobs based on configuration.
	 *
	 * @param array $config Bot configuration.
	 */
	private function reschedule_cron_jobs( $config ) {
		if ( ! $config['enabled'] ) {
			wp_clear_scheduled_hook( 'rank_math_seo_bot_daily_tasks' );
			wp_clear_scheduled_hook( 'rank_math_seo_bot_weekly_tasks' );
			wp_clear_scheduled_hook( 'rank_math_seo_bot_monthly_tasks' );
			return;
		}
		
		// Clear existing schedules
		wp_clear_scheduled_hook( 'rank_math_seo_bot_daily_tasks' );
		wp_clear_scheduled_hook( 'rank_math_seo_bot_weekly_tasks' );
		wp_clear_scheduled_hook( 'rank_math_seo_bot_monthly_tasks' );
		
		// Schedule new jobs
		wp_schedule_event( time(), 'daily', 'rank_math_seo_bot_daily_tasks' );
		wp_schedule_event( time(), 'weekly', 'rank_math_seo_bot_weekly_tasks' );
		wp_schedule_event( time(), 'monthly', 'rank_math_seo_bot_monthly_tasks' );
	}

	/**
	 * Clear bot cache.
	 */
	private function clear_bot_cache() {
		// Clear analysis cache
		delete_option( 'rank_math_seo_bot_last_analysis' );
		
		// Clear rankings cache
		delete_option( 'rank_math_seo_bot_current_rankings' );
		delete_option( 'rank_math_seo_bot_previous_rankings' );
		
		// Clear competitor cache
		delete_option( 'rank_math_seo_bot_competitor_analysis' );
		delete_option( 'rank_math_seo_bot_competitor_insights' );
		
		// Clear transients
		global $wpdb;
		$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_rank_math_seo_bot_%'" );
		$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_timeout_rank_math_seo_bot_%'" );
	}

	/**
	 * Reset bot data.
	 */
	private function reset_bot_data() {
		// Clear all bot options
		delete_option( 'rank_math_seo_bot_config' );
		delete_option( 'rank_math_seo_bot_last_analysis' );
		delete_option( 'rank_math_seo_bot_current_rankings' );
		delete_option( 'rank_math_seo_bot_previous_rankings' );
		delete_option( 'rank_math_seo_bot_ranking_changes' );
		delete_option( 'rank_math_seo_bot_ranking_logs' );
		delete_option( 'rank_math_seo_bot_competitor_analysis' );
		delete_option( 'rank_math_seo_bot_competitor_insights' );
		delete_option( 'rank_math_seo_bot_competitor_summary' );
		delete_option( 'rank_math_seo_bot_reports' );
		
		// Clear all analysis results
		global $wpdb;
		$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE 'rank_math_seo_bot_analysis_%'" );
		
		// Clear transients
		$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_rank_math_seo_bot_%'" );
		$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_timeout_rank_math_seo_bot_%'" );
		
		// Clear scheduled hooks
		wp_clear_scheduled_hook( 'rank_math_seo_bot_daily_tasks' );
		wp_clear_scheduled_hook( 'rank_math_seo_bot_weekly_tasks' );
		wp_clear_scheduled_hook( 'rank_math_seo_bot_monthly_tasks' );
	}

	/**
	 * Get configuration arguments.
	 *
	 * @return array Configuration arguments.
	 */
	private function get_config_args() {
		return [
			'enabled' => [
				'type' => 'boolean',
				'default' => false,
			],
			'auto_optimize_content' => [
				'type' => 'boolean',
				'default' => false,
			],
			'monitor_rankings' => [
				'type' => 'boolean',
				'default' => false,
			],
			'competitor_analysis' => [
				'type' => 'boolean',
				'default' => false,
			],
			'keyword_tracking' => [
				'type' => 'boolean',
				'default' => false,
			],
			'content_suggestions' => [
				'type' => 'boolean',
				'default' => false,
			],
			'technical_seo_monitoring' => [
				'type' => 'boolean',
				'default' => false,
			],
			'email_notifications' => [
				'type' => 'boolean',
				'default' => false,
			],
			'notification_frequency' => [
				'type' => 'string',
				'enum' => [ 'daily', 'weekly', 'monthly' ],
				'default' => 'weekly',
			],
			'notification_email' => [
				'type' => 'string',
				'format' => 'email',
			],
			'monitoring_interval' => [
				'type' => 'string',
				'enum' => [ 'hourly', 'daily', 'weekly' ],
				'default' => 'daily',
			],
			'priority_keywords' => [
				'type' => 'array',
				'items' => [
					'type' => 'string',
				],
			],
			'competitor_urls' => [
				'type' => 'array',
				'items' => [
					'type' => 'string',
					'format' => 'uri',
				],
			],
		];
	}

	// Permission check methods
	public function get_config_permission_check() {
		return current_user_can( 'manage_options' );
	}

	public function update_config_permission_check() {
		return current_user_can( 'manage_options' );
	}

	public function get_status_permission_check() {
		return current_user_can( 'manage_options' );
	}

	public function run_analysis_permission_check() {
		return current_user_can( 'manage_options' );
	}

	public function get_analysis_permission_check() {
		return current_user_can( 'manage_options' );
	}

	public function get_rankings_permission_check() {
		return current_user_can( 'manage_options' );
	}

	public function check_rankings_permission_check() {
		return current_user_can( 'manage_options' );
	}

	public function get_competitors_permission_check() {
		return current_user_can( 'manage_options' );
	}

	public function analyze_competitors_permission_check() {
		return current_user_can( 'manage_options' );
	}

	public function get_reports_permission_check() {
		return current_user_can( 'manage_options' );
	}

	public function generate_report_permission_check() {
		return current_user_can( 'manage_options' );
	}

	public function get_content_analysis_permission_check() {
		return current_user_can( 'edit_posts' );
	}

	public function optimize_content_permission_check() {
		return current_user_can( 'edit_posts' );
	}

	public function check_technical_seo_permission_check() {
		return current_user_can( 'manage_options' );
	}

	public function execute_action_permission_check() {
		return current_user_can( 'manage_options' );
	}
}
