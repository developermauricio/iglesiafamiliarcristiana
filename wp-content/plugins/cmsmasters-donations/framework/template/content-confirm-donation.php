<?php
/**
 * @package 	WordPress Plugin
 * @subpackage 	CMSMasters Donations
 * @version		1.1.0
 *
 * CMSMasters Donations Confirm Donation Template
 * Created by CMSMasters
 *
 */


global $cmsmasters_donations;


echo '<div class="donation_confirm">' .
	'<h2 class="donation_confirm_title">' . __('Confirmar tu', 'cmsmasters_donations') . ' ' . get_the_title() . '</h2>' .

	'<div class="donation_confirm_info">' .

		'<div class="donation_confirm_info_item donation_confirm_amount">' .
			'<span class="donation_confirm_info_title">' . esc_html__('Cantidad', 'cmsmasters_donations') . '</span>' .
			'<span class="donation_confirm_info_value">' . get_the_donation_amount_currency() . '</span>' .
		'</div>';

		if (get_the_recurrence_period($post) != '') {
			echo '<div class="donation_confirm_info_item donation_confirm_recurrence">' .
				'<span class="donation_confirm_info_title">' . esc_html__('Recurrente', 'cmsmasters_donations') . '</span>' .
				'<span class="donation_confirm_info_value">' . get_the_recurrence_period($post) . '</span>' .
			'</div>';
		}


		if (get_the_donation_campaign()) {
			echo '<div class="donation_confirm_info_item donation_confirm_campaign">' .
				'<span class="donation_confirm_info_title">' . esc_html__('Motivo', 'cmsmasters_donations') . '</span>' .
				'<span class="donation_confirm_info_value">' . get_the_donation_campaign() . '</span>' .
			'</div>';
		}

		echo '<div class="donation_confirm_info_item donation_confirm_received">' .
			'<span class="donation_confirm_info_title">' . esc_html__('Recibido', 'cmsmasters_donations') . '</span>' .
			'<span class="donation_confirm_info_value"><date>' . human_time_diff(get_the_time('U'), current_time('timestamp')) . ' ' . esc_html__('hace', 'cmsmasters_donations') . '</date></span>' .
		'</div>' .

		'<div class="donation_confirm_info_item donation_confirm_donator">' .
			'<span class="donation_confirm_info_title">' . esc_html__('Donante', 'cmsmasters_donations') . '</span>' .
			'<span class="donation_confirm_info_value">' .
				((get_the_donator_meta('website', null, true)) ? '<a href="' . get_the_donator_meta('website', null, true) . '" itemprop="name">' : '') .
				get_the_donator_meta('firstname') . ' ' . get_the_donator_meta('lastname') .
				((get_the_donator_meta('website', null, true)) ? '</a>' : '') .
			'</span>' .
		'</div>' .

	'</div>';


	if (is_anonymous_donation($post)) {
		echo '<p class="donation_confirm_anonymous">' . esc_attr__('Esta donación es anónima.', 'cmsmasters_donations') . '</p>';
	}


	if (get_the_excerpt() != '') {
		echo '<h4 class="donation_confirm_cont_title">' . apply_filters('the_donation_message_title', esc_attr__("Mensaje del donante", 'cmsmasters_donations')) . '</h4>';

		echo '<div class="donation_confirm_cont">' .
			apply_filters('the_donation_message', get_the_excerpt()) .
		'</div>';
	}

echo '</div>';
