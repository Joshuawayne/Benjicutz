<template>
  <div class="space-y-8 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-parlour-dark/15 pb-6">
      <div>
        <span class="text-[10px] font-bold tracking-[0.25em] text-parlour-terracotta uppercase block mb-1">
          NAIROBI LOGISTICS & ROUTING
        </span>
        <h1 class="text-3xl sm:text-4xl font-serif font-black text-parlour-dark tracking-tight uppercase">
          Bookings & Dispatch
        </h1>
        <p class="text-parlour-dark/70 text-xs sm:text-sm mt-1">
          Coordinate master barber mobile studio visits, client location dispatch, and real-time appointment status.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
        <button
          @click="openCreateModal"
          class="editorial-btn !py-2.5 !px-5 text-xs shadow-sm flex items-center gap-1.5"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          <span>New Client Booking</span>
        </button>
        <button
          @click="handleTriggerReminders"
          :disabled="reminderLoading"
          class="px-4 py-2.5 bg-parlour-card hover:bg-parlour-cream border border-parlour-dark/20 text-parlour-dark font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-sm flex items-center gap-1.5"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <span>{{ reminderLoading ? 'Dispatching...' : '12-Day Reminders' }}</span>
        </button>
      </div>
    </div>

    <!-- Alert Toast -->
    <Transition name="fade">
      <div v-if="toastMessage" class="p-4 bg-parlour-dark text-parlour-cream text-xs font-bold rounded-sm shadow-xl flex items-center justify-between border border-parlour-dark">
        <span>{{ toastMessage }}</span>
        <button @click="toastMessage = ''" class="text-parlour-terracotta font-bold">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </Transition>

    <!-- Filters & Search Bar -->
    <div class="bg-parlour-cream p-4 sm:p-5 rounded-sm border border-parlour-dark/15 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
      <!-- Search Input -->
      <div class="w-full md:w-80 relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search client, phone, or service..."
          class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm pl-9 pr-4 py-2.5 text-xs text-parlour-dark focus:border-parlour-dark outline-none placeholder:text-parlour-dark/40 font-medium"
        />
        <svg class="w-3.5 h-3.5 absolute left-3 top-3 text-parlour-dark/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
        <select
          v-model="selectedStatus"
          class="bg-parlour-card border border-parlour-dark/20 text-parlour-dark rounded-sm px-3.5 py-2.5 focus:border-parlour-dark outline-none font-bold uppercase tracking-wider text-[11px]"
        >
          <option value="ALL">All Statuses</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="PENDING">PENDING</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <select
          v-model="selectedZone"
          class="bg-parlour-card border border-parlour-dark/20 text-parlour-dark rounded-sm px-3.5 py-2.5 focus:border-parlour-dark outline-none font-bold uppercase tracking-wider text-[11px]"
        >
          <option value="ALL">All Nairobi Zones</option>
          <option value="KILELESHWA">Kileleshwa</option>
          <option value="WESTLANDS">Westlands</option>
          <option value="LAVINGTON">Lavington</option>
          <option value="KILIMANI">Kilimani</option>
          <option value="KAREN">Karen</option>
          <option value="GIGIRI">Gigiri</option>
          <option value="RUNDA">Runda</option>
          <option value="MUTHAIGA">Muthaiga</option>
          <option value="CBD">CBD</option>
          <option value="PARKLANDS">Parklands</option>
        </select>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredBookings.length === 0" class="py-16 text-center bg-parlour-cream rounded-sm border border-parlour-dark/15 space-y-4 p-8">
      <div class="w-12 h-12 rounded-sm bg-parlour-dark text-parlour-cream flex items-center justify-center mx-auto">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      </div>
      <h3 class="text-xl font-serif font-bold text-parlour-dark uppercase">
        {{ bookings.length === 0 ? 'No Appointments in Database' : 'No Matching Bookings' }}
      </h3>
      <p class="text-xs text-parlour-dark/70 max-w-md mx-auto">
        {{ bookings.length === 0
          ? 'Appointments booked via the public site or added manually appear here in real-time.'
          : 'Try clearing your search query or status/zone filters.' }}
      </p>
      <button
        v-if="bookings.length === 0"
        @click="openCreateModal"
        class="editorial-btn !py-2.5 !px-6 text-xs inline-flex items-center gap-1.5"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        <span>Create First Appointment</span>
      </button>
    </div>

    <!-- Responsive View 1: Desktop Table (Hidden on mobile) -->
    <div v-else class="hidden md:block bg-parlour-cream rounded-sm border border-parlour-dark/15 overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs text-parlour-dark">
          <thead class="bg-parlour-card border-b border-parlour-dark/15 text-parlour-dark uppercase tracking-wider font-serif font-bold">
            <tr>
              <th class="py-3.5 px-4">Client</th>
              <th class="py-3.5 px-4">Service</th>
              <th class="py-3.5 px-4">Nairobi Zone</th>
              <th class="py-3.5 px-4">Scheduled Date</th>
              <th class="py-3.5 px-4">Price</th>
              <th class="py-3.5 px-4">Status</th>
              <th class="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-parlour-dark/10">
            <tr
              v-for="booking in paginatedBookings"
              :key="booking.id"
              class="hover:bg-parlour-card/60 transition-colors"
            >
              <!-- Client Details -->
              <td class="py-4 px-4">
                <div class="font-serif font-bold text-sm text-parlour-dark">{{ booking.clientName }}</div>
                <div class="text-[11px] text-parlour-terracotta font-mono font-bold">{{ booking.clientPhone }}</div>
                <div v-if="booking.clientEmail" class="text-[10px] text-parlour-dark/60">{{ booking.clientEmail }}</div>
              </td>

              <!-- Service -->
              <td class="py-4 px-4 font-semibold text-parlour-dark">
                {{ booking.serviceName }}
              </td>

              <!-- Zone & Address -->
              <td class="py-4 px-4">
                <span class="inline-flex items-center gap-1 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 bg-parlour-dark text-parlour-cream rounded-sm">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  <span>{{ booking.zone }}</span>
                </span>
                <div class="text-[11px] text-parlour-dark/70 mt-1 truncate max-w-[180px]">
                  {{ booking.locationAddress || 'Client Residence' }}
                </div>
              </td>

              <!-- Date & Time -->
              <td class="py-4 px-4">
                <div class="font-bold text-parlour-dark">{{ formatDate(booking.scheduledAt) }}</div>
                <div class="text-[10px] text-parlour-dark/60 font-semibold">{{ formatTime(booking.scheduledAt) }}</div>
              </td>

              <!-- Amount -->
              <td class="py-4 px-4 font-serif font-black text-parlour-dark text-sm">
                KES {{ booking.priceAmount?.toLocaleString() || 0 }}
              </td>

              <!-- Status Pill -->
              <td class="py-4 px-4">
                <span
                  :class="getStatusBadgeClass(booking.status)"
                  class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm border inline-block"
                >
                  {{ booking.status }}
                </span>
              </td>

              <!-- Action Menu -->
              <td class="py-4 px-4 text-right space-x-1.5 whitespace-nowrap">
                <button
                  v-if="booking.status !== 'COMPLETED'"
                  @click="handleStatusUpdate(booking.id, 'COMPLETED')"
                  title="Mark Completed"
                  class="px-2.5 py-1 bg-emerald-800 text-parlour-cream rounded-sm font-bold text-[10px] uppercase tracking-wider hover:bg-emerald-900 transition-colors inline-flex items-center gap-1"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>Done</span>
                </button>
                <button
                  v-if="booking.status !== 'CONFIRMED' && booking.status !== 'COMPLETED'"
                  @click="handleStatusUpdate(booking.id, 'CONFIRMED')"
                  title="Confirm Booking"
                  class="px-2.5 py-1 bg-parlour-dark text-parlour-cream rounded-sm font-bold text-[10px] uppercase tracking-wider hover:bg-parlour-terracotta transition-colors"
                >
                  Confirm
                </button>
                <button
                  v-if="booking.status !== 'CANCELLED'"
                  @click="handleStatusUpdate(booking.id, 'CANCELLED')"
                  title="Cancel Booking"
                  class="px-2.5 py-1 bg-transparent text-amber-900 border border-amber-800 hover:bg-amber-900 hover:text-parlour-cream rounded-sm font-bold text-[10px] uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  @click="handleDelete(booking.id)"
                  title="Delete Record"
                  class="px-2.5 py-1 bg-transparent text-red-800 hover:bg-red-900 hover:text-parlour-cream border border-red-800/40 rounded-sm font-bold text-[10px] uppercase tracking-wider transition-colors"
                >
                  <svg class="w-3.5 h-3.5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Responsive View 2: Mobile Cards (Visible only on mobile devices) -->
    <div v-if="filteredBookings.length > 0" class="md:hidden space-y-4">
      <div
        v-for="booking in paginatedBookings"
        :key="booking.id"
        class="bg-parlour-cream p-5 rounded-sm border border-parlour-dark/15 space-y-3 shadow-sm"
      >
        <div class="flex items-start justify-between">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-parlour-dark text-parlour-cream rounded-sm inline-flex items-center gap-1 mb-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              </svg>
              <span>{{ booking.zone }}</span>
            </span>
            <h3 class="font-serif font-bold text-lg text-parlour-dark">{{ booking.clientName }}</h3>
            <a :href="`tel:${booking.clientPhone}`" class="text-xs text-parlour-terracotta font-mono font-bold hover:underline flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>{{ booking.clientPhone }}</span>
            </a>
          </div>

          <span
            :class="getStatusBadgeClass(booking.status)"
            class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm border"
          >
            {{ booking.status }}
          </span>
        </div>

        <div class="py-2 border-y border-parlour-dark/10 space-y-1 text-xs">
          <div class="flex justify-between">
            <span class="text-parlour-dark/60 font-medium">Service:</span>
            <span class="font-bold text-parlour-dark">{{ booking.serviceName }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-parlour-dark/60 font-medium">Scheduled:</span>
            <span class="font-bold text-parlour-dark">{{ formatDate(booking.scheduledAt) }} • {{ formatTime(booking.scheduledAt) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-parlour-dark/60 font-medium">Price:</span>
            <span class="font-serif font-black text-parlour-dark">KES {{ booking.priceAmount?.toLocaleString() || 0 }}</span>
          </div>
        </div>

        <!-- Mobile Actions -->
        <div class="flex items-center justify-end gap-2 pt-1">
          <button
            v-if="booking.status !== 'COMPLETED'"
            @click="handleStatusUpdate(booking.id, 'COMPLETED')"
            class="px-3 py-1.5 bg-emerald-800 text-parlour-cream rounded-sm font-bold text-[10px] uppercase tracking-wider inline-flex items-center gap-1"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span>Complete</span>
          </button>
          <button
            v-if="booking.status !== 'CANCELLED'"
            @click="handleStatusUpdate(booking.id, 'CANCELLED')"
            class="px-3 py-1.5 border border-amber-800 text-amber-900 rounded-sm font-bold text-[10px] uppercase tracking-wider"
          >
            Cancel
          </button>
          <button
            @click="handleDelete(booking.id)"
            class="px-3 py-1.5 border border-red-800/40 text-red-800 rounded-sm font-bold text-[10px] uppercase tracking-wider"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Editorial Pagination Bar -->
    <div
      v-if="filteredBookings.length > 0"
      class="bg-parlour-cream p-4 rounded-sm border border-parlour-dark/15 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-xs"
    >
      <div class="flex flex-wrap items-center gap-2 text-parlour-dark/70 font-medium">
        <span>
          Showing <strong class="text-parlour-dark">{{ paginationStart }}</strong> to <strong class="text-parlour-dark">{{ paginationEnd }}</strong> of <strong class="text-parlour-dark">{{ filteredBookings.length }}</strong> appointments
        </span>
        <span class="text-parlour-dark/30 hidden sm:inline">•</span>
        <div class="flex items-center gap-1.5">
          <label class="text-[10px] font-bold uppercase tracking-wider text-parlour-dark/60">Per Page:</label>
          <select
            v-model.number="pageSize"
            @change="currentPage = 1"
            class="bg-parlour-card border border-parlour-dark/20 text-parlour-dark rounded-sm px-2 py-1 font-bold text-[11px] outline-none"
          >
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
          </select>
        </div>
      </div>

      <div class="flex items-center gap-1.5">
        <button
          @click="currentPage--"
          :disabled="currentPage <= 1"
          class="px-3 py-1.5 bg-parlour-card border border-parlour-dark/20 text-parlour-dark rounded-sm font-bold text-xs uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-parlour-dark hover:text-parlour-cream transition-colors"
        >
          ← Prev
        </button>

        <div class="flex items-center gap-1">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'w-8 h-8 rounded-sm font-bold text-xs font-serif transition-colors',
              currentPage === page
                ? 'bg-parlour-dark text-parlour-cream shadow-sm'
                : 'bg-parlour-card text-parlour-dark hover:bg-parlour-cream border border-parlour-dark/15'
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="currentPage++"
          :disabled="currentPage >= totalPages"
          class="px-3 py-1.5 bg-parlour-card border border-parlour-dark/20 text-parlour-dark rounded-sm font-bold text-xs uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:bg-parlour-dark hover:text-parlour-cream transition-colors"
        >
          Next →
        </button>
      </div>
    </div>

    <!-- Create Manual Booking Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 z-50 bg-parlour-dark/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-parlour-cream border-2 border-parlour-dark rounded-sm max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
        <div class="flex items-center justify-between border-b border-parlour-dark/15 pb-4">
          <div>
            <span class="text-[10px] font-bold tracking-widest text-parlour-terracotta uppercase block">CONCIERGE DISPATCH</span>
            <h3 class="font-serif font-bold text-xl text-parlour-dark uppercase">Create Manual Appointment</h3>
          </div>
          <button @click="showCreateModal = false" class="text-parlour-dark/60 hover:text-parlour-dark p-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleCreateSubmit" class="space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Client Name</label>
              <input
                v-model="modalForm.clientName"
                type="text"
                placeholder="e.g. David Omondi"
                required
                class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark font-bold outline-none"
              />
            </div>

            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">WhatsApp Phone</label>
              <input
                v-model="modalForm.clientPhone"
                type="tel"
                placeholder="+254..."
                required
                class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark font-mono font-bold outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Service Selection</label>
              <input
                v-model="modalForm.serviceName"
                type="text"
                placeholder="e.g. Signature Craftsman Cut"
                required
                class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark font-bold outline-none"
              />
            </div>

            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Total Price (KES)</label>
              <input
                v-model.number="modalForm.priceAmount"
                type="number"
                placeholder="4500"
                required
                class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark font-mono font-bold outline-none"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Nairobi Zone</label>
              <select
                v-model="modalForm.zone"
                required
                class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark font-bold uppercase tracking-wider outline-none"
              >
                <option value="KILELESHWA">Kileleshwa</option>
                <option value="WESTLANDS">Westlands</option>
                <option value="LAVINGTON">Lavington</option>
                <option value="KILIMANI">Kilimani</option>
                <option value="KAREN">Karen</option>
                <option value="GIGIRI">Gigiri</option>
                <option value="RUNDA">Runda</option>
                <option value="MUTHAIGA">Muthaiga</option>
                <option value="CBD">CBD</option>
                <option value="PARKLANDS">Parklands</option>
              </select>
            </div>

            <div>
              <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Scheduled Date & Time</label>
              <input
                v-model="modalForm.scheduledAt"
                type="datetime-local"
                required
                class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark font-bold outline-none"
              />
            </div>
          </div>

          <div>
            <label class="block font-bold uppercase tracking-wider text-[10px] text-parlour-dark/80 mb-1">Residence / Delivery Address</label>
            <input
              v-model="modalForm.locationAddress"
              type="text"
              placeholder="e.g. Mandera Road, Apt 4B, Kileleshwa"
              class="w-full bg-parlour-card border border-parlour-dark/20 rounded-sm px-3.5 py-2.5 text-parlour-dark font-medium outline-none"
            />
          </div>

          <div class="flex items-center justify-end gap-3 pt-4 border-t border-parlour-dark/15">
            <button
              type="button"
              @click="showCreateModal = false"
              class="px-4 py-2.5 border border-parlour-dark/30 text-parlour-dark font-bold rounded-sm uppercase tracking-wider text-[11px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="modalSubmitting"
              class="editorial-btn !py-2.5 !px-6 text-xs inline-flex items-center gap-1.5"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>{{ modalSubmitting ? 'Creating...' : 'Create Appointment' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, computed, watch } from "vue";
import { useAdmin, type BookingItem } from "~/composables/useAdmin";
import { useAnalytics } from "~/composables/useAnalytics";

definePageMeta({ layout: "admin" });

const { bookings, fetchBookings, updateBookingStatus, deleteBooking, createAdminBooking } = useAdmin();
const { triggerReminders } = useAnalytics();

const searchQuery = ref("");
const selectedStatus = ref("ALL");
const selectedZone = ref("ALL");
const reminderLoading = ref(false);
const toastMessage = ref("");

// Pagination State
const currentPage = ref(1);
const pageSize = ref(10);

// Modal state
const showCreateModal = ref(false);
const modalSubmitting = ref(false);
const modalForm = reactive({
  clientName: "",
  clientPhone: "",
  clientEmail: "",
  serviceName: "Executive Signature Cut",
  priceAmount: 4500,
  zone: "KILELESHWA",
  locationAddress: "",
  scheduledAt: "",
});

onMounted(async () => {
  await fetchBookings();
});

const triggerToast = (msg: string) => {
  toastMessage.value = msg;
  setTimeout(() => {
    if (toastMessage.value === msg) toastMessage.value = "";
  }, 4000);
};

const openCreateModal = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);
  const tzOffset = tomorrow.getTimezoneOffset() * 60000;
  modalForm.scheduledAt = new Date(tomorrow.getTime() - tzOffset).toISOString().slice(0, 16);
  showCreateModal.value = true;
};

const handleCreateSubmit = async () => {
  modalSubmitting.value = true;
  const isoDate = new Date(modalForm.scheduledAt).toISOString();

  const success = await createAdminBooking({
    clientName: modalForm.clientName,
    clientPhone: modalForm.clientPhone,
    clientEmail: modalForm.clientEmail || undefined,
    serviceName: modalForm.serviceName,
    priceAmount: modalForm.priceAmount,
    zone: modalForm.zone,
    locationAddress: modalForm.locationAddress || `${modalForm.zone}, Nairobi`,
    scheduledAt: isoDate,
  });

  modalSubmitting.value = false;
  if (success) {
    showCreateModal.value = false;
    modalForm.clientName = "";
    modalForm.clientPhone = "";
    modalForm.locationAddress = "";
    triggerToast("Appointment created successfully!");
  } else {
    triggerToast("Failed to create appointment.");
  }
};

const handleStatusUpdate = async (id: string, newStatus: BookingItem["status"]) => {
  const success = await updateBookingStatus(id, newStatus);
  if (success) {
    triggerToast(`Booking marked as ${newStatus}`);
  } else {
    triggerToast("Failed to update booking status");
  }
};

const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this booking record?")) return;
  const success = await deleteBooking(id);
  if (success) {
    triggerToast("Booking deleted successfully");
  } else {
    triggerToast("Failed to delete booking");
  }
};

const handleTriggerReminders = async () => {
  reminderLoading.value = true;
  const res = await triggerReminders();
  reminderLoading.value = false;
  triggerToast(`${res.message} (${res.remindersSentCount} notifications sent)`);
};

// Filtered Bookings
const filteredBookings = computed(() => {
  return bookings.value.filter((b) => {
    const matchesSearch =
      !searchQuery.value ||
      b.clientName?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      b.clientPhone?.includes(searchQuery.value) ||
      b.serviceName?.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesStatus = selectedStatus.value === "ALL" || b.status === selectedStatus.value;
    const matchesZone =
      selectedZone.value === "ALL" ||
      (b.zone && b.zone.toUpperCase() === selectedZone.value.toUpperCase());

    return matchesSearch && matchesStatus && matchesZone;
  });
});

// Reset pagination on filter changes
watch([searchQuery, selectedStatus, selectedZone], () => {
  currentPage.value = 1;
});

// Paginated Computed
const totalPages = computed(() => {
  return Math.ceil(filteredBookings.value.length / pageSize.value) || 1;
});

const paginatedBookings = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredBookings.value.slice(start, start + pageSize.value);
});

const paginationStart = computed(() => {
  if (filteredBookings.value.length === 0) return 0;
  return (currentPage.value - 1) * pageSize.value + 1;
});

const paginationEnd = computed(() => {
  return Math.min(currentPage.value * pageSize.value, filteredBookings.value.length);
});

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "CONFIRMED":
      return "bg-parlour-dark text-parlour-cream border-parlour-dark";
    case "COMPLETED":
      return "bg-emerald-800 text-parlour-cream border-emerald-900";
    case "CANCELLED":
      return "bg-amber-900 text-parlour-cream border-amber-950";
    default:
      return "bg-amber-700 text-parlour-cream border-amber-800";
  }
};

const formatDate = (isoString: string) => {
  if (!isoString) return "-";
  return new Date(isoString).toLocaleDateString("en-KE", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (isoString: string) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleTimeString("en-KE", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
