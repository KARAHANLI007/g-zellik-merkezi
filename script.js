function openModal() {
    document.getElementById('loginModal').style.display = 'block';
  }
  
  function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
  }
  
  window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  
  // Formları yakala ve sahte işlem bildirimi ver
  document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
      form.addEventListener("submit", (e) => {
        e.preventDefault(); // sayfa yenilemesini engelle
        alert("İşlem başarıyla simüle edildi ✅ (Veritabanı bağlı değil)");
        form.reset(); // formu temizle
        closeModal(); // modalı kapat
      });
    });
  });
// Takvim için
const monthYear = document.getElementById('monthYear');
const daysGrid = document.getElementById('daysGrid');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let currentDate = new Date();

const bookedDates = {
  // Format: 'YYYY-MM-DD': true (dolu günler)
  // Örnek dolu günler (bugünden sonraki 5 gün içinden seçtim)
  '2025-07-12': true,
  '2025-07-15': true,
  '2025-07-18': true,
};

function renderCalendar(date) {
  daysGrid.innerHTML = '';

  const year = date.getFullYear();
  const month = date.getMonth();

  // Ayın ilk günü hangi gün
  const firstDay = new Date(year, month, 1).getDay(); // 0=pazar, 1=pazartesi...
  const adjustedFirstDay = (firstDay === 0) ? 6 : firstDay - 1; // pazartesi=0 bazlı düzenleme

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = date.toLocaleString('tr-TR', { month: 'long', year: 'numeric' });

  // Boş günler
  for (let i = 0; i < adjustedFirstDay; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.classList.add('empty');
    daysGrid.appendChild(emptyDiv);
  }

  // Günler
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    const fullDate = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;

    dayDiv.textContent = day;

    if(bookedDates[fullDate]) {
      dayDiv.classList.add('booked');
    } else {
      dayDiv.addEventListener('click', () => selectDate(dayDiv, fullDate));
    }

    daysGrid.appendChild(dayDiv);
  }
}

let selectedDate = null;
const appointmentForm = document.getElementById('appointmentForm');

function selectDate(dayDiv, dateStr) {
  if(selectedDate) {
    selectedDate.classList.remove('selected');
  }
  selectedDate = dayDiv;
  dayDiv.classList.add('selected');

  // Randevu formuna tarih ekleme
  appointmentForm.querySelector('input[type="date"]').value = dateStr;
}

// Ay değiştir butonları
prevMonthBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() -1);
  renderCalendar(currentDate);
  clearSelectedDate();
}

nextMonthBtn.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() +1);
  renderCalendar(currentDate);
  clearSelectedDate();
}

function clearSelectedDate() {
  if(selectedDate) {
    selectedDate.classList.remove('selected');
    selectedDate = null;
  }
  appointmentForm.querySelector('input[type="date"]').value = '';
}

// Form gönderme simülasyonu
appointmentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = appointmentForm.querySelector('input[type="text"]').value.trim();
  const phone = appointmentForm.querySelector('input[type="tel"]').value.trim();
  const date = appointmentForm.querySelector('input[type="date"]').value;
  const time = appointmentForm.querySelector('input[type="time"]').value;
  const service = appointmentForm.querySelector('select').value;

  if(!date) {
    alert('Lütfen takvimden bir tarih seçin!');
    return;
  }

  alert(`Randevunuz alındı!\n\nAd: ${name}\nTelefon: ${phone}\nTarih: ${date}\nSaat: ${time}\nHizmet: ${service}`);

  appointmentForm.reset();
  clearSelectedDate();
});

// Sayfa açıldığında takvimi göster
document.addEventListener('DOMContentLoaded', () => {
  renderCalendar(currentDate);
});
  