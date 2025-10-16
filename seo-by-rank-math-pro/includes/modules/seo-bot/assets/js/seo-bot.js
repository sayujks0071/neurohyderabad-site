/**
 * SEO Bot Admin JavaScript
 *
 * @since 3.0.99
 */

(function($) {
    'use strict';

    const SEOBot = {
        init: function() {
            this.bindEvents();
            this.initTabs();
            this.initTooltips();
        },

        bindEvents: function() {
            // Tab switching
            $(document).on('click', '.nav-tab', this.switchTab);
            
            // Configuration form
            $(document).on('submit', '#seo-bot-config-form', this.saveConfiguration);
            $(document).on('click', '.reset-config', this.resetConfiguration);
            
            // Bot toggle
            $(document).on('click', '.toggle-bot', this.toggleBot);
            
            // Analysis actions
            $(document).on('click', '.run-analysis', this.runAnalysis);
            $(document).on('click', '.run-comprehensive-analysis', this.runComprehensiveAnalysis);
            $(document).on('click', '.check-rankings', this.checkRankings);
            $(document).on('click', '.analyze-competitors', this.analyzeCompetitors);
            $(document).on('click', '.generate-report', this.generateReport);
            $(document).on('click', '.optimize-content', this.optimizeContent);
            $(document).on('click', '.check-technical-seo', this.checkTechnicalSEO);
            
            // Report generation
            $(document).on('click', '.generate-weekly-report', this.generateWeeklyReport);
            $(document).on('click', '.generate-monthly-report', this.generateMonthlyReport);
            $(document).on('click', '.generate-competitor-report', this.generateCompetitorReport);
            
            // Recommendation actions
            $(document).on('click', '[data-action]', this.handleRecommendationAction);
        },

        initTabs: function() {
            // Set initial active tab
            $('.nav-tab').first().addClass('nav-tab-active');
            $('.tab-content').first().addClass('active');
        },

        initTooltips: function() {
            // Initialize tooltips if needed
            if (typeof $.fn.tooltip === 'function') {
                $('[data-tooltip]').tooltip();
            }
        },

        switchTab: function(e) {
            e.preventDefault();
            
            const $tab = $(this);
            const targetTab = $tab.data('tab');
            
            // Update tab navigation
            $('.nav-tab').removeClass('nav-tab-active');
            $tab.addClass('nav-tab-active');
            
            // Update tab content
            $('.tab-content').removeClass('active');
            $(`#${targetTab}`).addClass('active');
            
            // Load tab-specific data if needed
            SEOBot.loadTabData(targetTab);
        },

        loadTabData: function(tab) {
            switch(tab) {
                case 'rankings':
                    this.loadRankingsData();
                    break;
                case 'competitors':
                    this.loadCompetitorsData();
                    break;
                case 'reports':
                    this.loadReportsData();
                    break;
            }
        },

        saveConfiguration: function(e) {
            e.preventDefault();
            
            const $form = $(this);
            const formData = new FormData($form[0]);
            
            // Add action
            formData.append('action', 'rank_math_seo_bot_save_config');
            
            SEOBot.showLoading();
            
            $.ajax({
                url: rankMathSeoBot.ajaxUrl,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    SEOBot.hideLoading();
                    if (response.success) {
                        SEOBot.showMessage('Configuration saved successfully!', 'success');
                        // Reload page to reflect changes
                        setTimeout(() => {
                            location.reload();
                        }, 1500);
                    } else {
                        SEOBot.showMessage(response.data || 'Failed to save configuration', 'error');
                    }
                },
                error: function() {
                    SEOBot.hideLoading();
                    SEOBot.showMessage('An error occurred while saving configuration', 'error');
                }
            });
        },

        resetConfiguration: function() {
            if (confirm('Are you sure you want to reset the configuration to defaults? This action cannot be undone.')) {
                SEOBot.showLoading();
                
                $.ajax({
                    url: rankMathSeoBot.ajaxUrl,
                    type: 'POST',
                    data: {
                        action: 'rank_math_seo_bot_reset_config',
                        nonce: rankMathSeoBot.nonce
                    },
                    success: function(response) {
                        SEOBot.hideLoading();
                        if (response.success) {
                            SEOBot.showMessage('Configuration reset to defaults', 'success');
                            location.reload();
                        } else {
                            SEOBot.showMessage(response.data || 'Failed to reset configuration', 'error');
                        }
                    },
                    error: function() {
                        SEOBot.hideLoading();
                        SEOBot.showMessage('An error occurred while resetting configuration', 'error');
                    }
                });
            }
        },

        toggleBot: function() {
            const $button = $(this);
            const isEnabled = $button.data('enabled') === '1';
            const newStatus = isEnabled ? 'disable' : 'enable';
            
            SEOBot.showLoading();
            
            $.ajax({
                url: rankMathSeoBot.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'rank_math_seo_bot_toggle',
                    status: newStatus,
                    nonce: rankMathSeoBot.nonce
                },
                success: function(response) {
                    SEOBot.hideLoading();
                    if (response.success) {
                        const newText = isEnabled ? 'Enable Bot' : 'Disable Bot';
                        $button.text(newText).data('enabled', isEnabled ? '0' : '1');
                        
                        // Update status indicator
                        const $statusDot = $('.status-dot');
                        const $statusText = $('.status-text');
                        
                        if (isEnabled) {
                            $statusDot.removeClass('active').addClass('inactive');
                            $statusText.text('Inactive');
                        } else {
                            $statusDot.removeClass('inactive').addClass('active');
                            $statusText.text('Active');
                        }
                        
                        SEOBot.showMessage(`SEO Bot ${newStatus}d successfully`, 'success');
                    } else {
                        SEOBot.showMessage(response.data || `Failed to ${newStatus} bot`, 'error');
                    }
                },
                error: function() {
                    SEOBot.hideLoading();
                    SEOBot.showMessage(`An error occurred while ${newStatus}ing bot`, 'error');
                }
            });
        },

        runAnalysis: function() {
            SEOBot.showLoading();
            
            $.ajax({
                url: rankMathSeoBot.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'rank_math_seo_bot_action',
                    action_type: 'run_analysis',
                    nonce: rankMathSeoBot.nonce
                },
                success: function(response) {
                    SEOBot.hideLoading();
                    if (response.success) {
                        SEOBot.showMessage('Analysis completed successfully!', 'success');
                        // Reload analysis tab
                        setTimeout(() => {
                            location.reload();
                        }, 1500);
                    } else {
                        SEOBot.showMessage(response.data || 'Analysis failed', 'error');
                    }
                },
                error: function() {
                    SEOBot.hideLoading();
                    SEOBot.showMessage('An error occurred during analysis', 'error');
                }
            });
        },

        runComprehensiveAnalysis: function() {
            SEOBot.showLoading();
            
            $.ajax({
                url: rankMathSeoBot.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'rank_math_seo_bot_action',
                    action_type: 'run_comprehensive_analysis',
                    nonce: rankMathSeoBot.nonce
                },
                success: function(response) {
                    SEOBot.hideLoading();
                    if (response.success) {
                        SEOBot.showMessage('Comprehensive analysis completed!', 'success');
                        setTimeout(() => {
                            location.reload();
                        }, 1500);
                    } else {
                        SEOBot.showMessage(response.data || 'Comprehensive analysis failed', 'error');
                    }
                },
                error: function() {
                    SEOBot.hideLoading();
                    SEOBot.showMessage('An error occurred during comprehensive analysis', 'error');
                }
            });
        },

        checkRankings: function() {
            SEOBot.showLoading();
            
            $.ajax({
                url: rankMathSeoBot.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'rank_math_seo_bot_action',
                    action_type: 'check_rankings',
                    nonce: rankMathSeoBot.nonce
                },
                success: function(response) {
                    SEOBot.hideLoading();
                    if (response.success) {
                        SEOBot.showMessage('Rankings checked successfully!', 'success');
                        SEOBot.loadRankingsData();
                    } else {
                        SEOBot.showMessage(response.data || 'Failed to check rankings', 'error');
                    }
                },
                error: function() {
                    SEOBot.hideLoading();
                    SEOBot.showMessage('An error occurred while checking rankings', 'error');
                }
            });
        },

        analyzeCompetitors: function() {
            SEOBot.showLoading();
            
            $.ajax({
                url: rankMathSeoBot.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'rank_math_seo_bot_action',
                    action_type: 'analyze_competitors',
                    nonce: rankMathSeoBot.nonce
                },
                success: function(response) {
                    SEOBot.hideLoading();
                    if (response.success) {
                        SEOBot.showMessage('Competitor analysis completed!', 'success');
                        SEOBot.loadCompetitorsData();
                    } else {
                        SEOBot.showMessage(response.data || 'Failed to analyze competitors', 'error');
                    }
                },
                error: function() {
                    SEOBot.hideLoading();
                    SEOBot.showMessage('An error occurred during competitor analysis', 'error');
                }
            });
        },

        generateReport: function() {
            SEOBot.showLoading();
            
            $.ajax({
                url: rankMathSeoBot.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'rank_math_seo_bot_action',
                    action_type: 'generate_report',
                    nonce: rankMathSeoBot.nonce
                },
                success: function(response) {
                    SEOBot.hideLoading();
                    if (response.success) {
                        SEOBot.showMessage('Report generated successfully!', 'success');
                        // Open report in new window or download
                        if (response.data && response.data.download_url) {
                            window.open(response.data.download_url, '_blank');
                        }
                    } else {
                        SEOBot.showMessage(response.data || 'Failed to generate report', 'error');
                    }
                },
                error: function() {
                    SEOBot.hideLoading();
                    SEOBot.showMessage('An error occurred while generating report', 'error');
                }
            });
        },

        optimizeContent: function() {
            SEOBot.showLoading();
            
            $.ajax({
                url: rankMathSeoBot.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'rank_math_seo_bot_action',
                    action_type: 'optimize_content',
                    nonce: rankMathSeoBot.nonce
                },
                success: function(response) {
                    SEOBot.hideLoading();
                    if (response.success) {
                        SEOBot.showMessage('Content optimization completed!', 'success');
                    } else {
                        SEOBot.showMessage(response.data || 'Failed to optimize content', 'error');
                    }
                },
                error: function() {
                    SEOBot.hideLoading();
                    SEOBot.showMessage('An error occurred during content optimization', 'error');
                }
            });
        },

        checkTechnicalSEO: function() {
            SEOBot.showLoading();
            
            $.ajax({
                url: rankMathSeoBot.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'rank_math_seo_bot_action',
                    action_type: 'check_technical_seo',
                    nonce: rankMathSeoBot.nonce
                },
                success: function(response) {
                    SEOBot.hideLoading();
                    if (response.success) {
                        SEOBot.showMessage('Technical SEO check completed!', 'success');
                    } else {
                        SEOBot.showMessage(response.data || 'Failed to check technical SEO', 'error');
                    }
                },
                error: function() {
                    SEOBot.hideLoading();
                    SEOBot.showMessage('An error occurred during technical SEO check', 'error');
                }
            });
        },

        generateWeeklyReport: function() {
            SEOBot.generateReportByType('weekly');
        },

        generateMonthlyReport: function() {
            SEOBot.generateReportByType('monthly');
        },

        generateCompetitorReport: function() {
            SEOBot.generateReportByType('competitor');
        },

        generateReportByType: function(type) {
            SEOBot.showLoading();
            
            $.ajax({
                url: rankMathSeoBot.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'rank_math_seo_bot_action',
                    action_type: 'generate_report',
                    report_type: type,
                    nonce: rankMathSeoBot.nonce
                },
                success: function(response) {
                    SEOBot.hideLoading();
                    if (response.success) {
                        SEOBot.showMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} report generated successfully!`, 'success');
                        if (response.data && response.data.download_url) {
                            window.open(response.data.download_url, '_blank');
                        }
                    } else {
                        SEOBot.showMessage(response.data || `Failed to generate ${type} report`, 'error');
                    }
                },
                error: function() {
                    SEOBot.hideLoading();
                    SEOBot.showMessage(`An error occurred while generating ${type} report`, 'error');
                }
            });
        },

        handleRecommendationAction: function() {
            const $button = $(this);
            const action = $button.data('action');
            
            SEOBot.showLoading();
            
            $.ajax({
                url: rankMathSeoBot.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'rank_math_seo_bot_action',
                    action_type: 'handle_recommendation',
                    recommendation_action: action,
                    nonce: rankMathSeoBot.nonce
                },
                success: function(response) {
                    SEOBot.hideLoading();
                    if (response.success) {
                        SEOBot.showMessage('Recommendation action completed!', 'success');
                        $button.closest('.recommendation-item').fadeOut();
                    } else {
                        SEOBot.showMessage(response.data || 'Failed to handle recommendation', 'error');
                    }
                },
                error: function() {
                    SEOBot.hideLoading();
                    SEOBot.showMessage('An error occurred while handling recommendation', 'error');
                }
            });
        },

        loadRankingsData: function() {
            $.ajax({
                url: rankMathSeoBot.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'rank_math_seo_bot_action',
                    action_type: 'get_rankings_data',
                    nonce: rankMathSeoBot.nonce
                },
                success: function(response) {
                    if (response.success && response.data) {
                        SEOBot.updateRankingsTable(response.data);
                    }
                },
                error: function() {
                    console.error('Failed to load rankings data');
                }
            });
        },

        loadCompetitorsData: function() {
            $.ajax({
                url: rankMathSeoBot.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'rank_math_seo_bot_action',
                    action_type: 'get_competitors_data',
                    nonce: rankMathSeoBot.nonce
                },
                success: function(response) {
                    if (response.success && response.data) {
                        SEOBot.updateCompetitorsList(response.data);
                    }
                },
                error: function() {
                    console.error('Failed to load competitors data');
                }
            });
        },

        loadReportsData: function() {
            $.ajax({
                url: rankMathSeoBot.ajaxUrl,
                type: 'POST',
                data: {
                    action: 'rank_math_seo_bot_action',
                    action_type: 'get_reports_data',
                    nonce: rankMathSeoBot.nonce
                },
                success: function(response) {
                    if (response.success && response.data) {
                        SEOBot.updateReportsList(response.data);
                    }
                },
                error: function() {
                    console.error('Failed to load reports data');
                }
            });
        },

        updateRankingsTable: function(data) {
            const $table = $('.rankings-table tbody');
            $table.empty();
            
            if (data.length === 0) {
                $table.append('<tr class="no-data"><td colspan="5">No ranking data available</td></tr>');
                return;
            }
            
            data.forEach(function(item) {
                const changeClass = item.change > 0 ? 'improved' : item.change < 0 ? 'dropped' : 'unchanged';
                const changeText = item.change > 0 ? `+${item.change}` : item.change.toString();
                
                const row = `
                    <tr>
                        <td>${item.keyword}</td>
                        <td>${item.position || 'N/A'}</td>
                        <td class="${changeClass}">${changeText}</td>
                        <td>${item.last_checked}</td>
                        <td>
                            <button type="button" class="button button-small" data-keyword="${item.keyword}">
                                View Details
                            </button>
                        </td>
                    </tr>
                `;
                $table.append(row);
            });
        },

        updateCompetitorsList: function(data) {
            const $list = $('.competitors-list');
            $list.empty();
            
            if (data.length === 0) {
                $list.append('<div class="no-competitors"><p>No competitor data available</p></div>');
                return;
            }
            
            data.forEach(function(competitor) {
                const item = `
                    <div class="competitor-item">
                        <div class="competitor-header">
                            <h4>${competitor.domain}</h4>
                            <span class="competitor-status status-${competitor.status}">
                                ${competitor.status.charAt(0).toUpperCase() + competitor.status.slice(1)}
                            </span>
                        </div>
                        <div class="competitor-details">
                            <div class="technical-summary">
                                <h5>Technical SEO</h5>
                                <div class="technical-stats">
                                    <div class="stat-item">
                                        <span class="stat-label">Site Speed:</span>
                                        <span class="stat-value">${competitor.technical?.site_speed?.score || 'N/A'}</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">Mobile Score:</span>
                                        <span class="stat-value">${competitor.technical?.mobile_friendly?.score || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                $list.append(item);
            });
        },

        updateReportsList: function(data) {
            // Update reports list with available reports
            console.log('Reports data:', data);
        },

        showLoading: function() {
            $('#seo-bot-loading').show();
        },

        hideLoading: function() {
            $('#seo-bot-loading').hide();
        },

        showMessage: function(message, type) {
            const $messages = $('#seo-bot-messages');
            const messageClass = type || 'info';
            
            const $message = $(`
                <div class="seo-bot-message ${messageClass}">
                    <p>${message}</p>
                </div>
            `);
            
            $messages.append($message);
            
            // Auto-remove after 5 seconds
            setTimeout(function() {
                $message.fadeOut(function() {
                    $(this).remove();
                });
            }, 5000);
        },

        // Utility functions
        formatDate: function(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        },

        formatNumber: function(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    };

    // Initialize when document is ready
    $(document).ready(function() {
        SEOBot.init();
    });

    // Make SEOBot available globally
    window.SEOBot = SEOBot;

})(jQuery);
