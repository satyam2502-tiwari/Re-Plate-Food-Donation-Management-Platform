// --- Variables ---
const donationForm = document.getElementById("donationForm");
const donationsContainer = document.getElementById("donationsContainer");
const statusFilter = document.getElementById("statusFilter");

let donations = [];

// --- Add Donation ---
donationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const donation = {
    id: Date.now(),
    foodName: document.getElementById("foodName").value,
    quantity: parseFloat(document.getElementById("quantity").value),
    category: document.getElementById("category").value,
    location: document.getElementById("location").value,
    details: document.getElementById("details").value,
    status: "Available",
  };

  donations.push(donation);
  donationForm.reset();
  updateDashboard();
  renderDonations();
});

// --- Render Donations ---
function renderDonations() {
  donationsContainer.innerHTML = "";

  const filtered = donations.filter((don) => {
    return statusFilter.value === "All" || don.status === statusFilter.value;
  });

  filtered.forEach((donation) => {
    const div = document.createElement("div");
    div.className = "donation-item";
    div.innerHTML = `
      <h4>${donation.foodName}</h4>
      <p><strong>Quantity:</strong> ${donation.quantity} kg</p>
      <p><strong>Category:</strong> ${donation.category}</p>
      <p><strong>Location:</strong> ${donation.location}</p>
      <p><strong>Details:</strong> ${donation.details}</p>
      <p class="status ${donation.status}">Status: ${donation.status}</p>
      <div class="donation-actions">
        <button onclick="updateStatus(${donation.id}, 'Claimed')">Claim</button>
        <button onclick="updateStatus(${donation.id}, 'Completed')">Complete</button>
        <button onclick="deleteDonation(${donation.id})">Delete</button>
      </div>
    `;
    donationsContainer.appendChild(div);
  });
}

// --- Update Status ---
function updateStatus(id, newStatus) {
  const donation = donations.find((d) => d.id === id);
  if (donation) donation.status = newStatus;
  updateDashboard();
  renderDonations();
}

// --- Delete Donation ---
function deleteDonation(id) {
  donations = donations.filter((d) => d.id !== id);
  updateDashboard();
  renderDonations();
}

// --- Filter Donations ---
statusFilter.addEventListener("change", renderDonations);

// --- Dashboard Update ---
function updateDashboard() {
  const total = donations.length;
  const active = donations.filter((d) => d.status === "Available").length;
  const completed = donations.filter((d) => d.status === "Completed").length;
  const totalFood = donations.reduce((sum, d) => sum + d.quantity, 0);

  document.getElementById("totalDonations").textContent = total;
  document.getElementById("activeDonations").textContent = active;
  document.getElementById("mealsServed").textContent = completed * 10; // estimate
  document.getElementById("foodSaved").textContent = `${totalFood} kg`;
}
