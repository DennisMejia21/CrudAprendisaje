const form = document.querySelector('#contact-form');
const fields = { id: document.querySelector('#contact-id'), name: document.querySelector('#name'), email: document.querySelector('#email'), phone: document.querySelector('#phone') };
const body = document.querySelector('#contacts-body');
const table = document.querySelector('#contacts-table');
const empty = document.querySelector('#empty-state');
const search = document.querySelector('#search');
const title = document.querySelector('#form-title');
const saveButton = document.querySelector('#save-button');
const cancelButton = document.querySelector('#cancel-button');
const storageKey = 'crud-contactos';

let contacts = JSON.parse(localStorage.getItem(storageKey) || '[]');
const save = () => localStorage.setItem(storageKey, JSON.stringify(contacts));
const escapeHtml = value => value.replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);

function render() {
  const query = search.value.trim().toLowerCase();
  const results = contacts.filter(contact => [contact.name, contact.email, contact.phone].some(value => value.toLowerCase().includes(query)));
  body.innerHTML = results.map(contact => `<tr>
    <td>${escapeHtml(contact.name)}</td><td>${escapeHtml(contact.email)}</td><td>${escapeHtml(contact.phone)}</td>
    <td><button data-action="edit" data-id="${contact.id}" type="button">Editar</button><button data-action="delete" data-id="${contact.id}" type="button" class="danger">Eliminar</button></td>
  </tr>`).join('');
  table.classList.toggle('hidden', results.length === 0);
  empty.classList.toggle('hidden', results.length > 0);
  empty.textContent = contacts.length ? 'No se encontraron contactos.' : 'Aún no hay contactos registrados.';
}

function resetForm() {
  form.reset(); fields.id.value = ''; title.textContent = 'Nuevo contacto';
  saveButton.textContent = 'Guardar contacto'; cancelButton.classList.add('hidden');
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const contact = { id: fields.id.value || crypto.randomUUID(), name: fields.name.value.trim(), email: fields.email.value.trim(), phone: fields.phone.value.trim() };
  const index = contacts.findIndex(item => item.id === contact.id);
  if (index < 0) contacts.unshift(contact); else contacts[index] = contact;
  save(); resetForm(); render();
});

body.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]'); if (!button) return;
  const index = contacts.findIndex(contact => contact.id === button.dataset.id); if (index < 0) return;
  if (button.dataset.action === 'delete') {
    if (confirm(`¿Eliminar a ${contacts[index].name}?`)) { contacts.splice(index, 1); save(); resetForm(); render(); }
    return;
  }
  const contact = contacts[index];
  fields.id.value = contact.id; fields.name.value = contact.name; fields.email.value = contact.email; fields.phone.value = contact.phone;
  title.textContent = 'Editar contacto'; saveButton.textContent = 'Actualizar contacto'; cancelButton.classList.remove('hidden'); fields.name.focus();
});

search.addEventListener('input', render);
cancelButton.addEventListener('click', resetForm);
render();