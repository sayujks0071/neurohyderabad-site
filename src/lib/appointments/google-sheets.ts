/**
 * Google Sheets Integration
 * 
 * Sends appointment booking data to Google Sheets via Google Apps Script webhook
 */

import type { BookingData } from "@/packages/appointment-form/types";

export interface GoogleSheetsPayload {
    name: string;
    email?: string;
    phone?: string;
    condition: string;
    message: string;
    appointmentDate?: string;
    appointmentTime?: string;
    age?: string;
    gender?: string;
    timestamp: string;
}

/**
 * Format booking data for Google Sheets
 */
export function formatBookingForGoogleSheets(
    booking: BookingData,
    options?: {
        email?: string;
        phone?: string;
    }
): GoogleSheetsPayload {
    return {
        name: booking.patientName,
        email: options?.email,
        phone: options?.phone,
        condition: booking.reason,
        message: booking.reason, // Using reason as message, can be enhanced
        appointmentDate: booking.appointmentDate,
        appointmentTime: booking.appointmentTime,
        age: booking.age,
        gender: booking.gender,
        timestamp: new Date().toISOString(),
    };
}

/**
 * Send appointment data to Google Sheets via webhook
 */
export async function sendToGoogleSheets(
    payload: GoogleSheetsPayload
): Promise<{ success: boolean; error?: string }> {
    const webhookUrl = process.env.GOOGLE_SCRIPT_WEBHOOK_URL;

    if (!webhookUrl) {
        console.warn(
            "[google-sheets] GOOGLE_SCRIPT_WEBHOOK_URL not configured, skipping Google Sheets sync"
        );
        return { success: false, error: "Google Sheets webhook URL not configured" };
    }

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text().catch(() => "Unknown error");
            console.error(
                `[google-sheets] Webhook responded with ${response.status}:`,
                errorText
            );
            return {
                success: false,
                error: `Google Sheets webhook failed: ${response.status}`,
            };
        }

        console.info(
            `[google-sheets] Successfully sent appointment data for ${payload.name}`
        );
        return { success: true };
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Unknown error";
        console.error("[google-sheets] Failed to send data:", message);
        return {
            success: false,
            error: `Failed to connect to Google Sheets: ${message}`,
        };
    }
}

