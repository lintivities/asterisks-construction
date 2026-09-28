/**
 * Asterisk Construction - Official Website Script
 * Interactive portfolio filtering, modal previews, navigation, and consultation form.
 */

// All 12 Showcase Projects faithfully extracted from Company Profile 2026 PDF
const projectsData = [
  {
    id: "01",
    title: "Mr & Mrs Mohammed Family Home",
    subtitle: "Design and construction of the proposed Mr & Mrs Mohammed family home",
    category: "mansions",
    categoryLabel: "Mansions & Villas",
    location: "Kilifi, Kenya",
    landSize: "5 Acres",
    floorArea: "Luxury Coastal Estate",
    summary: "Expansive 12-bedroom coastal luxury residence developed on 5 acres of land in Kilifi with underground parking, home cinema, and Olympic pool.",
    amenities: [
      "12 Bedrooms plus master suite",
      "7 Bedrooms ensuite",
      "11 Bathrooms",
      "4 Living rooms",
      "2 Kitchens each with a pantry",
      "Executive Home Office",
      "Private Library",
      "State-of-the-art Theater",
      "Dedicated Steam room",
      "Fully equipped Gym",
      "Dedicated Laundry room",
      "Underground parking for 10 cars",
      "Exterior parking for 15 cars",
      "Resort-style Swimming pool",
      "Detached Guest house",
      "Outdoor Gazebo"
    ],
    image: "assets/projects/project-01.png"
  },
  {
    id: "02",
    title: "Joy Ville Towers",
    subtitle: "Design and construction of the proposed Joy ville towers",
    category: "apartments",
    categoryLabel: "Commercial & Residential Apartments",
    location: "Juja Farm, Kiambu County",
    landSize: "¼ Acre",
    floorArea: "15 Floors (2 units @ 103m² per floor)",
    summary: "A premier 15-floor residential apartment building featuring modern two-bedroom master-ensuite units with rooftop garden and full amenities.",
    amenities: [
      "Spacious Living room (18.5m²)",
      "Dining area (7.5m²)",
      "Open plan kitchen with breakfast counter (7m²)",
      "Ensuite master bedroom with walk-in closet & private balcony (30m²)",
      "Secondary bedroom with built-in closets (13.5m²)",
      "Shared modern bathroom (4.5m²)",
      "Private balcony (12m²)",
      "Rooftop garden & entertainment terrace",
      "Shared dedicated laundry room",
      "Parking for 2 cars per apartment + 2 guest bays",
      "Integrated fire fighting & suppression system",
      "Enclosed kids' play area",
      "Landscaped garden relaxation space",
      "High-speed elevator services",
      "Backup generator for elevators and security lights"
    ],
    image: "assets/projects/project-02.png"
  },
  {
    id: "03",
    title: "Modern Mansion in Thika",
    subtitle: "Design and construction of a 5 bedroom mansion in Thika",
    category: "mansions",
    categoryLabel: "Mansions & Villas",
    location: "Thika, Kiambu County",
    landSize: "½ Acre",
    floorArea: "270m²",
    summary: "A sophisticated 5-bedroom master-ensuite mansion set on half an acre featuring twin manicured yards and scenic rooftop viewing balcony.",
    amenities: [
      "Expansive living room",
      "Formal dining area",
      "Upper floor family room & lounge",
      "Contemporary chef's kitchen",
      "Dedicated pantry",
      "Ensuite master bedroom with wall-mounted closet",
      "3 ensuite bedrooms with closets and private balconies",
      "Dedicated guest bedroom",
      "Shared modern bathroom",
      "Laundry room",
      "Private study & library",
      "Inviting back porch",
      "Covered parking shed for 4 cars",
      "Front manicured landscaped yard",
      "Rear private manicured yard",
      "Scenic rooftop viewing balcony"
    ],
    image: "assets/projects/project-03.png"
  },
  {
    id: "04",
    title: "Contemporary Bungalow in Ruai",
    subtitle: "Design and construction of a three bedroom bungalow in Ruai",
    category: "bungalows",
    categoryLabel: "Bungalows",
    location: "Ruai, Nairobi",
    landSize: "⅛ Acre",
    floorArea: "143m²",
    summary: "Efficiently planned 3-bedroom master-ensuite modern bungalow built in Ruai featuring gazebo, custom lighting, and manicured yards.",
    amenities: [
      "Entry porch (6.6m²)",
      "Spacious living room (27.9m²)",
      "Dining area (14.4m²)",
      "Modern kitchen (12.2m²)",
      "Walk-in pantry (5.2m²)",
      "Ensuite master bedroom with wall-mounted closet (26.6m²)",
      "2 Additional bedrooms with closets (28m²)",
      "Shared family bathroom (5.4m²)",
      "Back porch (8.7m²)",
      "Covered parking shed for 2 cars",
      "Front manicured lawn",
      "Back manicured yard",
      "Custom garden gazebo",
      "Architectural garden lighting"
    ],
    image: "assets/projects/project-04.png"
  },
  {
    id: "05",
    title: "Executive Mansion in Kabete",
    subtitle: "Design and construction of a 6 bedroom mansion in Kabete",
    category: "mansions",
    categoryLabel: "Mansions & Villas",
    location: "Kabete, Kiambu County",
    landSize: "¼ Acre",
    floorArea: "330m² (excl. roof)",
    summary: "Architectural showpiece with 6 bedrooms, private swimming pool, executive study, and covered parking for six vehicles in Kabete.",
    amenities: [
      "Grand living room with double height ceiling",
      "Formal dining area",
      "Upper floor family room",
      "Gourmet kitchen & pantry",
      "Master suite with luxury walk-in closet",
      "3 ensuite bedrooms with closets and private balconies",
      "2 bedrooms with wall-mounted closets",
      "Dedicated guest bedroom",
      "Shared modern bathroom",
      "Laundry room",
      "Private library",
      "Executive home office",
      "Custom swimming pool",
      "Covered parking shed for 6 vehicles"
    ],
    image: "assets/projects/project-05.png"
  },
  {
    id: "06",
    title: "Bustani Apartment Building",
    subtitle: "Design and construction of the proposed Bustani apartment building",
    category: "apartments",
    categoryLabel: "Commercial & Residential Apartments",
    location: "Donholm, Nairobi County",
    landSize: "100 × 100 ft Plot",
    floorArea: "4 Floors Multi-Unit",
    summary: "High-yield 4-floor residential apartment complex in Donholm engineered for 250,000 Ksh/month rental revenue and a rapid 6-year ROI.",
    amenities: [
      "Optimized layout: 2 two-bedroom units, 1 one-bedroom unit, 1 bedsitter unit per floor",
      "Expected rental income: 250,000 Ksh/month (6-year ROI)",
      "Dedicated resident parking bays",
      "24-hour guarded security & control post",
      "Perimeter & security lighting",
      "Reliable constant water supply infrastructure",
      "Children's play park",
      "Manicured central garden",
      "Shared laundry facility",
      "High-speed fiber internet infrastructure",
      "Free DSTV distribution services",
      "Panoramic rooftop balcony area",
      "Integrated garbage collection services"
    ],
    image: "assets/projects/project-06.png"
  },
  {
    id: "07",
    title: "Luxury Villa in Kitengela",
    subtitle: "Design and construction of a 5 bedroom mansion in Kitengela",
    category: "mansions",
    categoryLabel: "Mansions & Villas",
    location: "Kitengela, Kajiado County",
    landSize: "⅛ Acre",
    floorArea: "290m² (excl. roof)",
    summary: "Modern flat-roof 5-bedroom luxury residence featuring designer interiors, private balconies, and landscaped grounds in Kitengela.",
    amenities: [
      "Open living room with ambient light",
      "Dining area connecting to terrace",
      "Upper floor family room",
      "Kitchen with walk-in pantry",
      "Ensuite master bedroom with wall-mounted designer closet",
      "3 ensuite bedrooms with closets and private balconies",
      "Private guest bedroom",
      "Shared modern bathroom",
      "Laundry room",
      "Private quiet library",
      "Executive office",
      "Covered parking shed for 2 cars",
      "Manicured perimeter yard & garden"
    ],
    image: "assets/projects/project-07.png"
  },
  {
    id: "08",
    title: "Suburban Bungalow in Syokimau",
    subtitle: "Design and construction of a four bedroom bungalow in Syokimau",
    category: "bungalows",
    categoryLabel: "Bungalows",
    location: "Syokimau, Machakos County",
    landSize: "¼ Acre",
    floorArea: "180m²",
    summary: "Spacious 4-bedroom bungalow with a versatile attic room and twin manicured yards designed for peaceful suburban family living.",
    amenities: [
      "Welcoming living room",
      "Dedicated dining area",
      "Fully fitted kitchen with pantry",
      "Home office / study",
      "Spacious functional attic room",
      "Ensuite master bedroom with wall-mounted closet",
      "2 bedrooms with built-in closets",
      "Shared family bathroom",
      "Covered parking shed for 2 cars",
      "Front and back manicured yards",
      "Outdoor gazebo for entertaining"
    ],
    image: "assets/projects/project-08.png"
  },
  {
    id: "09",
    title: "Serene Bungalow in Kenol",
    subtitle: "Design and construction of a three bedroom bungalow in Kenol",
    category: "bungalows",
    categoryLabel: "Bungalows",
    location: "Kenol, Murang’a County",
    landSize: "¼ Acre",
    floorArea: "170m²",
    summary: "Tranquil 3-bedroom master-ensuite country bungalow with swimming pool, gazebo, and manicured green grounds in Murang’a county.",
    amenities: [
      "Spacious living room",
      "Dining area with garden views",
      "Modern kitchen & pantry",
      "Dedicated office / study",
      "Ensuite master bedroom with wall-mounted closet",
      "2 bedrooms with built-in closets",
      "Shared bathroom",
      "Covered parking shed for 2 cars",
      "Front and back manicured yards",
      "Outdoor gazebo and leisure area"
    ],
    image: "assets/projects/project-09.png"
  },
  {
    id: "10",
    title: "The Crest Resort in Kitui",
    subtitle: "Design and construction of The Crest Resort in Kitui",
    category: "resorts",
    categoryLabel: "Commercial & Hospitality",
    location: "Kitui County",
    landSize: "6 Acres",
    floorArea: "Full Resort Development",
    summary: "A 6-acre nature getaway camping resort featuring luxury A-frame chalets with jacuzzis, quad bike track, restaurant, and conference suites.",
    amenities: [
      "3-Bedroom A-frame cabins with living room, kitchen, bathroom, master ensuite & jacuzzi",
      "Ensuite single room guest cabins",
      "Dedicated camp site with safari amenities",
      "Full-service restaurant and cocktail bar",
      "Resort-style outdoor swimming pool",
      "Corporate boardrooms and executive suites",
      "Fully equipped fitness gym",
      "Onsite mini-mart & essentials store",
      "Full tournament paintball field",
      "All-terrain quad bike adventure track",
      "Expansive manicured tropical gardens"
    ],
    image: "assets/projects/project-10.png"
  },
  {
    id: "11",
    title: "Modern Country Bungalow in Limuru",
    subtitle: "Design and construction of a three bedroom bungalow in Limuru",
    category: "bungalows",
    categoryLabel: "Bungalows",
    location: "Limuru, Kiambu County",
    landSize: "½ Acre",
    floorArea: "138m²",
    summary: "Charming 3-bedroom master-ensuite residence on half an acre in the scenic highland climate of Limuru with dual yards.",
    amenities: [
      "Covered entry porch",
      "Warm, light-filled living room",
      "Dining area",
      "Country style kitchen & pantry",
      "Ensuite master bedroom with wall-mounted closet",
      "2 bedrooms with built-in closets",
      "Shared bathroom",
      "Covered parking shed for 2 cars",
      "Front manicured lawn",
      "Back manicured garden",
      "Outdoor relaxation gazebo"
    ],
    image: "assets/projects/project-11.png"
  },
  {
    id: "12",
    title: "Five Bedroom Mansionette in Thika",
    subtitle: "Design and construction of a five bedroom mansionette in Thika",
    category: "mansions",
    categoryLabel: "Mansions & Villas",
    location: "Thika, Kiambu County",
    landSize: "40 × 80 Plot",
    floorArea: "240m²",
    summary: "Masterfully designed 240m² 5-bedroom double-storey mansionette maximizing space, natural lighting, and luxury on a compact plot.",
    amenities: [
      "Spacious living room",
      "Formal dining area",
      "Chef's kitchen with pantry",
      "Upper floor family room & lounge",
      "Dedicated laundry room",
      "Private office / study",
      "Ensuite master bedroom with wall-mounted closet",
      "2 ensuite bedrooms with built-in closets",
      "Shared modern bathroom",
      "Covered parking shed for 4 cars",
      "Front and back manicured private yards"
    ],
    image: "assets/projects/project-12.png"
  }
];

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
  renderProjects('all');
  setupFilters();
  setupModal();
  setupNavigation();
  setupForm();
});

/**
 * Render Project Cards into Grid
 */
function renderProjects(filter) {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  grid.innerHTML = '';
  
  const filtered = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  filtered.forEach(proj => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', proj.category);

    card.innerHTML = `
      <div class="project-img-wrap">
        <img src="${proj.image}" alt="${proj.title}" loading="lazy">
        <span class="project-badge-num">Project ${proj.id}</span>
        <span class="project-category-tag">${proj.categoryLabel}</span>
      </div>
      <div class="project-body">
        <div class="project-location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <span>${proj.location}</span>
        </div>
        <h3>${proj.title}</h3>
        <p class="project-desc">${proj.summary}</p>
        <div class="project-specs">
          <span class="spec-pill">Plot: ${proj.landSize}</span>
          <span class="spec-pill">Area: ${proj.floorArea}</span>
        </div>
        <button class="project-action-btn" onclick="openProjectModal('${proj.id}')">
          <span>View Full Specifications</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>
    `;

    grid.appendChild(card);
  });
}

/**
 * Setup Filter Buttons
 */
function setupFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });
}

/**
 * Open Project Details Modal
 */
function openProjectModal(id) {
  const proj = projectsData.find(p => p.id === id);
  if (!proj) return;

  const modal = document.getElementById('projectModal');
  const img = document.getElementById('modalImg');
  const num = document.getElementById('modalBadgeNum');
  const tag = document.getElementById('modalTag');
  const title = document.getElementById('modalTitle');
  const subtitle = document.getElementById('modalSubtitle');
  const loc = document.getElementById('modalLocation');
  const land = document.getElementById('modalLand');
  const area = document.getElementById('modalArea');
  const list = document.getElementById('modalAmenitiesList');

  img.src = proj.image;
  img.alt = proj.title;
  num.textContent = `Project ${proj.id}`;
  tag.textContent = proj.categoryLabel;
  title.textContent = proj.title;
  subtitle.textContent = proj.subtitle;
  loc.textContent = proj.location;
  land.textContent = proj.landSize;
  area.textContent = proj.floorArea;

  list.innerHTML = '';
  proj.amenities.forEach(am => {
    const item = document.createElement('div');
    item.className = 'modal-amenity-item';
    item.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${am}</span>
    `;
    list.appendChild(item);
  });

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/**
 * Close Modal
 */
function setupModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  if (!modal || !closeBtn) return;

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * Setup Navigation & Scroll Effects
 */
function setupNavigation() {
  const header = document.getElementById('siteHeader');
  const toggle = document.getElementById('mobileToggle');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (toggle) {
    toggle.addEventListener('click', () => {
      header.classList.toggle('mobile-open');
    });

    const links = document.querySelectorAll('.nav-link');
    links.forEach(l => {
      l.addEventListener('click', () => {
        header.classList.remove('mobile-open');
      });
    });
  }
}

/**
 * Setup Quote Consultation Form
 */
function setupForm() {
  const form = document.getElementById('quoteForm');
  const statusMsg = document.getElementById('formStatusMsg');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('clientName').value;
    statusMsg.textContent = `Thank you, ${name}! Your consultation request has been received. Our team will contact you within 24 hours.`;
    statusMsg.classList.add('success');
    statusMsg.style.display = 'block';
    form.reset();

    setTimeout(() => {
      statusMsg.style.display = 'none';
      statusMsg.classList.remove('success');
    }, 7000);
  });
}

