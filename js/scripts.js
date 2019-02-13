// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

var currentAddressBook = new AddressBook();

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// Manipulation functions for UI, Contacts, and Address Book

function removeFromContacts(val) {
  currentAddressBook.deleteContact(val)
  console.log(val);
  $("li#contact"+val).remove();
}

// User Interface logic

$(document).ready(function() {

  $("form#add-contact-info").submit(function(event) {
    event.preventDefault();
    var firstNameIn = $("input#first-name").val();
    var lastNameIn = $("input#last-name").val();
    var phoneNumIn = $("input#phone-number").val();
    var contactToAdd = new Contact(firstNameIn, lastNameIn, phoneNumIn);
    currentAddressBook.addContact(contactToAdd);
    $("ul#contact-list").append(
      "<li id='contact" + currentAddressBook.currentId + "'><button type='button' class='red-button' value='" + currentAddressBook.currentId + "' onClick='removeFromContacts(this.value)'>Delete this.</button> Name: " + contactToAdd.fullName() + ".  Phone Number: " + contactToAdd.phoneNumber + "</li>"
    );
  });
});
