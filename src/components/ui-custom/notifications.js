
import './notifications.css';

export function showNotification(message, type = 'info') {
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 1000);
}

export function showNotificationWithOptions(message, type, onConfirm) {
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <p class="notification-message">${message}</p>
        <div class="notification-actions">
            <button id="confirm-btn" class="notification-btn confirm">Yes</button>
            <button id="cancel-btn" class="notification-btn cancel">No</button>
        </div>
    `;
  document.body.appendChild(notification);


  setTimeout(() => notification.classList.add('show'), 10);

  // Xử lý sự kiện cho nút bấm
  document.getElementById("confirm-btn").addEventListener("click", () => {
    onConfirm();
    removeNotification();
  });

  document.getElementById("cancel-btn").addEventListener("click", removeNotification);

  // Auto xác nhận sau 5 giây nếu không có phản hồi
  const autoConfirm = setTimeout(() => {
    onConfirm();
    removeNotification();
  }, 5000);

  function removeNotification() {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
    clearTimeout(autoConfirm);
  }
}
