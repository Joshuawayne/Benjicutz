import { ref, computed } from "vue";
import type { CreateBookingPayload, NairobiZone } from "~/domain/models/Booking";
import { NAIROBI_SERVICES } from "~/domain/models/Service";
import { NAIROBI_ZONES } from "~/domain/models/Booking";

export function useBooking() {
  const isSubmitting = ref(false);
  const selectedZone = ref<NairobiZone>("KILELESHWA");
  const selectedServiceId = ref<string>("srv-exec-signature");
  const selectedDate = ref<string>(new Date().toISOString().split("T")[0]);
  const selectedTime = ref<string>("10:00");

  const selectedService = computed(() => {
    return NAIROBI_SERVICES.find((s) => s.id === selectedServiceId.value) || NAIROBI_SERVICES[0];
  });

  const selectedZoneDetail = computed(() => {
    return NAIROBI_ZONES.find((z) => z.id === selectedZone.value) || NAIROBI_ZONES[0];
  });

  const totalPrice = computed(() => {
    return selectedService.value.priceKes + selectedZoneDetail.value.transportFeeKes;
  });

  const generateWhatsAppLink = (payload: CreateBookingPayload) => {
    const text = encodeURIComponent(
      `Hello Master Craftsman, I would like to book a mobile studio session:\n\n` +
        `• Client: ${payload.clientName}\n` +
        `• Service: ${payload.serviceName} (KES ${payload.priceAmount})\n` +
        `• Nairobi Zone: ${payload.zone} (${payload.locationAddress})\n` +
        `• Date & Time: ${payload.scheduledAt}\n\n` +
        `Please confirm your transit availability.`
    );
    return `https://wa.me/254751022224?text=${text}`;
  };

  const submitBooking = async (formData: { clientName: string; clientPhone: string; clientEmail?: string; locationAddress: string }) => {
    isSubmitting.value = true;
    // Build proper ISO 8601 datetime string for Postgres TIMESTAMPTZ
    const scheduledAtStr = new Date(`${selectedDate.value}T${selectedTime.value}:00`).toISOString();

    const payload: CreateBookingPayload = {
      clientName: formData.clientName,
      clientPhone: formData.clientPhone,
      clientEmail: formData.clientEmail,
      serviceId: selectedService.value.id,
      serviceName: selectedService.value.title,
      priceAmount: selectedService.value.priceKes,
      zone: selectedZone.value,
      locationAddress: formData.locationAddress,
      scheduledAt: scheduledAtStr,
    };

    try {
      // Post to Deno Backend API via Nuxt Nitro Proxy
      await $fetch("/api/v1/bookings", {
        method: "POST",
        body: payload,
      }).catch((err) => {
        console.warn("[Backend API offline, proceeding with instant WhatsApp dispatch]", err);
      });

      const waUrl = generateWhatsAppLink(payload);
      return { success: true, payload, waUrl };
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    selectedZone,
    selectedServiceId,
    selectedDate,
    selectedTime,
    selectedService,
    selectedZoneDetail,
    totalPrice,
    isSubmitting,
    submitBooking,
    generateWhatsAppLink,
  };
}
