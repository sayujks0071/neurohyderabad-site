<?php
/**
 * Content Optimizer class for SEO Bot.
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
 * Content_Optimizer class.
 */
class Content_Optimizer {

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
		if ( ! $this->config['content_suggestions'] ) {
			return;
		}

		$this->action( 'rank_math/content/analyzed', 'provide_suggestions' );
		$this->action( 'save_post', 'auto_optimize_content', 20, 2 );
	}

	/**
	 * Provide content optimization suggestions.
	 *
	 * @param array $analysis Content analysis data.
	 * @return array Suggestions.
	 */
	public function provide_suggestions( $analysis ) {
		$suggestions = [];

		// Title optimization
		if ( isset( $analysis['title'] ) ) {
			$title_suggestions = $this->optimize_title( $analysis['title'] );
			if ( ! empty( $title_suggestions ) ) {
				$suggestions['title'] = $title_suggestions;
			}
		}

		// Meta description optimization
		if ( isset( $analysis['description'] ) ) {
			$desc_suggestions = $this->optimize_meta_description( $analysis['description'] );
			if ( ! empty( $desc_suggestions ) ) {
				$suggestions['description'] = $desc_suggestions;
			}
		}

		// Content optimization
		if ( isset( $analysis['content'] ) ) {
			$content_suggestions = $this->optimize_content( $analysis['content'] );
			if ( ! empty( $content_suggestions ) ) {
				$suggestions['content'] = $content_suggestions;
			}
		}

		// Keyword optimization
		if ( isset( $analysis['keywords'] ) ) {
			$keyword_suggestions = $this->optimize_keywords( $analysis['keywords'] );
			if ( ! empty( $keyword_suggestions ) ) {
				$suggestions['keywords'] = $keyword_suggestions;
			}
		}

		return $suggestions;
	}

	/**
	 * Optimize title.
	 *
	 * @param string $title Current title.
	 * @return array Title optimization suggestions.
	 */
	private function optimize_title( $title ) {
		$suggestions = [];
		$length      = strlen( $title );

		// Check title length
		if ( $length < 30 ) {
			$suggestions[] = [
				'type' => 'warning',
				'message' => __( 'Title is too short. Aim for 30-60 characters.', 'rank-math-pro' ),
				'action' => 'extend_title',
			];
		} elseif ( $length > 60 ) {
			$suggestions[] = [
				'type' => 'warning',
				'message' => __( 'Title is too long. Keep it under 60 characters.', 'rank-math-pro' ),
				'action' => 'shorten_title',
			];
		}

		// Check for power words
		$power_words = [ 'ultimate', 'complete', 'best', 'guide', 'tips', 'secrets', 'proven', 'expert' ];
		$has_power_word = false;
		foreach ( $power_words as $word ) {
			if ( stripos( $title, $word ) !== false ) {
				$has_power_word = true;
				break;
			}
		}

		if ( ! $has_power_word ) {
			$suggestions[] = [
				'type' => 'suggestion',
				'message' => __( 'Consider adding a power word to make your title more compelling.', 'rank-math-pro' ),
				'action' => 'add_power_word',
			];
		}

		// Check for numbers
		if ( ! preg_match( '/\d+/', $title ) ) {
			$suggestions[] = [
				'type' => 'suggestion',
				'message' => __( 'Adding numbers to your title can increase click-through rates.', 'rank-math-pro' ),
				'action' => 'add_number',
			];
		}

		return $suggestions;
	}

	/**
	 * Optimize meta description.
	 *
	 * @param string $description Current meta description.
	 * @return array Meta description optimization suggestions.
	 */
	private function optimize_meta_description( $description ) {
		$suggestions = [];
		$length      = strlen( $description );

		// Check description length
		if ( $length < 120 ) {
			$suggestions[] = [
				'type' => 'warning',
				'message' => __( 'Meta description is too short. Aim for 120-160 characters.', 'rank-math-pro' ),
				'action' => 'extend_description',
			];
		} elseif ( $length > 160 ) {
			$suggestions[] = [
				'type' => 'warning',
				'message' => __( 'Meta description is too long. Keep it under 160 characters.', 'rank-math-pro' ),
				'action' => 'shorten_description',
			];
		}

		// Check for call-to-action
		$cta_words = [ 'learn', 'discover', 'find out', 'get', 'download', 'read', 'explore' ];
		$has_cta = false;
		foreach ( $cta_words as $word ) {
			if ( stripos( $description, $word ) !== false ) {
				$has_cta = true;
				break;
			}
		}

		if ( ! $has_cta ) {
			$suggestions[] = [
				'type' => 'suggestion',
				'message' => __( 'Add a call-to-action to encourage clicks.', 'rank-math-pro' ),
				'action' => 'add_cta',
			];
		}

		return $suggestions;
	}

	/**
	 * Optimize content.
	 *
	 * @param string $content Current content.
	 * @return array Content optimization suggestions.
	 */
	private function optimize_content( $content ) {
		$suggestions = [];
		$word_count  = str_word_count( strip_tags( $content ) );

		// Check content length
		if ( $word_count < 300 ) {
			$suggestions[] = [
				'type' => 'warning',
				'message' => __( 'Content is too short. Aim for at least 300 words.', 'rank-math-pro' ),
				'action' => 'extend_content',
			];
		} elseif ( $word_count > 2000 ) {
			$suggestions[] = [
				'type' => 'suggestion',
				'message' => __( 'Consider breaking long content into multiple sections or pages.', 'rank-math-pro' ),
				'action' => 'break_content',
			];
		}

		// Check for headings
		$heading_count = preg_match_all( '/<h[1-6][^>]*>/i', $content );
		if ( $heading_count < 2 ) {
			$suggestions[] = [
				'type' => 'suggestion',
				'message' => __( 'Add more headings to improve content structure.', 'rank-math-pro' ),
				'action' => 'add_headings',
			];
		}

		// Check for images
		$image_count = preg_match_all( '/<img[^>]*>/i', $content );
		if ( $image_count === 0 ) {
			$suggestions[] = [
				'type' => 'suggestion',
				'message' => __( 'Add images to make your content more engaging.', 'rank-math-pro' ),
				'action' => 'add_images',
			];
		}

		// Check for internal links
		$internal_links = preg_match_all( '/<a[^>]*href=["\']' . preg_quote( home_url(), '/' ) . '[^"\']*["\'][^>]*>/i', $content );
		if ( $internal_links < 2 ) {
			$suggestions[] = [
				'type' => 'suggestion',
				'message' => __( 'Add more internal links to improve site structure.', 'rank-math-pro' ),
				'action' => 'add_internal_links',
			];
		}

		// Check for external links
		$external_links = preg_match_all( '/<a[^>]*href=["\'](?!' . preg_quote( home_url(), '/' ) . ')[^"\']*["\'][^>]*>/i', $content );
		if ( $external_links === 0 ) {
			$suggestions[] = [
				'type' => 'suggestion',
				'message' => __( 'Add external links to authoritative sources.', 'rank-math-pro' ),
				'action' => 'add_external_links',
			];
		}

		return $suggestions;
	}

	/**
	 * Optimize keywords.
	 *
	 * @param array $keywords Current keywords.
	 * @return array Keyword optimization suggestions.
	 */
	private function optimize_keywords( $keywords ) {
		$suggestions = [];

		// Check keyword density
		if ( isset( $keywords['density'] ) ) {
			$density = $keywords['density'];
			if ( $density < 0.5 ) {
				$suggestions[] = [
					'type' => 'warning',
					'message' => __( 'Keyword density is too low. Aim for 0.5-2%.', 'rank-math-pro' ),
					'action' => 'increase_keyword_density',
				];
			} elseif ( $density > 3 ) {
				$suggestions[] = [
					'type' => 'warning',
					'message' => __( 'Keyword density is too high. Keep it under 3%.', 'rank-math-pro' ),
					'action' => 'reduce_keyword_density',
				];
			}
		}

		// Check for LSI keywords
		if ( isset( $keywords['lsi'] ) && empty( $keywords['lsi'] ) ) {
			$suggestions[] = [
				'type' => 'suggestion',
				'message' => __( 'Add LSI (Latent Semantic Indexing) keywords to improve relevance.', 'rank-math-pro' ),
				'action' => 'add_lsi_keywords',
			];
		}

		return $suggestions;
	}

	/**
	 * Auto-optimize content on save.
	 *
	 * @param int     $post_id Post ID.
	 * @param WP_Post $post    Post object.
	 */
	public function auto_optimize_content( $post_id, $post ) {
		if ( wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
			return;
		}

		if ( ! $this->config['auto_optimize_content'] ) {
			return;
		}

		// Get current SEO data
		$title       = get_post_meta( $post_id, 'rank_math_title', true );
		$description = get_post_meta( $post_id, 'rank_math_description', true );
		$focus_keyword = get_post_meta( $post_id, 'rank_math_focus_keyword', true );

		// Auto-optimize title if empty
		if ( empty( $title ) ) {
			$optimized_title = $this->generate_optimized_title( $post->post_title, $focus_keyword );
			if ( $optimized_title ) {
				update_post_meta( $post_id, 'rank_math_title', $optimized_title );
			}
		}

		// Auto-optimize meta description if empty
		if ( empty( $description ) ) {
			$optimized_description = $this->generate_optimized_description( $post->post_content, $focus_keyword );
			if ( $optimized_description ) {
				update_post_meta( $post_id, 'rank_math_description', $optimized_description );
			}
		}

		// Auto-add focus keyword if empty
		if ( empty( $focus_keyword ) ) {
			$suggested_keyword = $this->suggest_focus_keyword( $post->post_title, $post->post_content );
			if ( $suggested_keyword ) {
				update_post_meta( $post_id, 'rank_math_focus_keyword', $suggested_keyword );
			}
		}
	}

	/**
	 * Generate optimized title.
	 *
	 * @param string $current_title Current title.
	 * @param string $focus_keyword Focus keyword.
	 * @return string Optimized title.
	 */
	private function generate_optimized_title( $current_title, $focus_keyword ) {
		$title = $current_title;

		// Add focus keyword if not present
		if ( ! empty( $focus_keyword ) && stripos( $title, $focus_keyword ) === false ) {
			$title = $focus_keyword . ' - ' . $title;
		}

		// Ensure proper length
		if ( strlen( $title ) > 60 ) {
			$title = substr( $title, 0, 57 ) . '...';
		}

		return $title;
	}

	/**
	 * Generate optimized meta description.
	 *
	 * @param string $content Content.
	 * @param string $focus_keyword Focus keyword.
	 * @return string Optimized meta description.
	 */
	private function generate_optimized_description( $content, $focus_keyword ) {
		// Extract first paragraph or create from content
		$description = wp_trim_words( strip_tags( $content ), 25 );

		// Add focus keyword if not present
		if ( ! empty( $focus_keyword ) && stripos( $description, $focus_keyword ) === false ) {
			$description = $focus_keyword . ' - ' . $description;
		}

		// Ensure proper length
		if ( strlen( $description ) > 160 ) {
			$description = substr( $description, 0, 157 ) . '...';
		}

		return $description;
	}

	/**
	 * Suggest focus keyword.
	 *
	 * @param string $title Title.
	 * @param string $content Content.
	 * @return string Suggested focus keyword.
	 */
	private function suggest_focus_keyword( $title, $content ) {
		// Extract potential keywords from title
		$words = explode( ' ', strtolower( $title ) );
		$words = array_filter( $words, function( $word ) {
			return strlen( $word ) > 3 && ! in_array( $word, [ 'the', 'and', 'for', 'with', 'from', 'this', 'that' ] );
		});

		if ( ! empty( $words ) ) {
			return implode( ' ', array_slice( $words, 0, 2 ) );
		}

		return '';
	}

	/**
	 * Get content analysis for a post.
	 *
	 * @param int $post_id Post ID.
	 * @return array Content analysis.
	 */
	public function get_content_analysis( $post_id ) {
		$post = get_post( $post_id );
		if ( ! $post ) {
			return [];
		}

		$analysis = [
			'title' => get_post_meta( $post_id, 'rank_math_title', true ) ?: $post->post_title,
			'description' => get_post_meta( $post_id, 'rank_math_description', true ),
			'content' => $post->post_content,
			'keywords' => [
				'focus' => get_post_meta( $post_id, 'rank_math_focus_keyword', true ),
				'density' => $this->calculate_keyword_density( $post->post_content, get_post_meta( $post_id, 'rank_math_focus_keyword', true ) ),
			],
		];

		return $this->provide_suggestions( $analysis );
	}

	/**
	 * Calculate keyword density.
	 *
	 * @param string $content Content.
	 * @param string $keyword Keyword.
	 * @return float Keyword density percentage.
	 */
	private function calculate_keyword_density( $content, $keyword ) {
		if ( empty( $keyword ) ) {
			return 0;
		}

		$content = strtolower( strip_tags( $content ) );
		$keyword = strtolower( $keyword );
		$word_count = str_word_count( $content );
		$keyword_count = substr_count( $content, $keyword );

		return $word_count > 0 ? ( $keyword_count / $word_count ) * 100 : 0;
	}
}
