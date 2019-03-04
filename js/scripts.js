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
function Contact(firstName, lastName, contactMethods) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.contactMethods = contactMethods
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// Manipulation functions for UI, Contacts, and Address Book
var subFormOneState = 0;
var subFormTwoState = 0;
var subFormThreeState = 0;

function removeFromContacts(val) {
  currentAddressBook.deleteContact(val)
  console.log(val);
  $("li#contact"+val).remove();
}

function toggleSubFormOne() {
  if (subFormOneState == 0) {
    $("div#home-address-form").slideToggle();
    subFormOneState = 1;
  }
  else {
    $("div#home-address-form").slideToggle();
    subFormOneState = 0;
  }
}

function toggleSubFormTwo() {
  if (subFormTwoState == 0) {
    $("div#work-address-form").slideToggle();
    subFormTwoState = 1;
  }
  else {
    $("div#work-address-form").slideToggle();
    subFormTwoState = 0;
  }
}

function toggleSubFormThree() {
  if (subFormThreeState == 0) {
    $("div#extra-info-form").slideToggle();
    subFormThreeState = 1;
  }
  else {
    $("div#extra-info-form").slideToggle();
    subFormThreeState = 0;
  }
}

function cleanArray(arrayIn) {
  var arrayToPrune = arrayIn;
  var prunedArray = [];
  arrayToPrune.forEach(function(element) {
    if (element != "") {
      prunedArray.push(element);
    }
  });
  return prunedArray;
}

// User Interface logic

$(document).ready(function() {

  $("form#add-contact-info").submit(function(event) {
    event.preventDefault();
    var targetID = (currentAddressBook.currentId + 1);
    $("div#output-div").append("<div id='contact" + targetID + "' class='col-md-12'>" +
        "<div class='card px-2 py-1'>" +
          "<div class='card-heading bg-primary' id='card-header" +  targetID + "'><h3><span id='name" + targetID +"'></span></h3><div id='button"+targetID+"'><button type='button' value='"+targetID+"' onClick='removeFromContacts(this.value)'>Remove this Contact</button><br><button type='button' value='"+targetID+"' onClick='showDetailsOfContact(this.value)'>Show Details</button></div></div>" +
          "<div class='card-body bg-muted' id='contact-body"+targetID+"'>" +
            "<div class='row' id='contact-details" + targetID + "'></div>"
          "</div></div></div>");
    var firstNameIn = $("input#first-name").val();
    var lastNameIn = $("input#last-name").val();
    var allContactMethods = [];
    if (subFormOneState == 1) {
      var contactMethodA = [];
      var addressInA = $("input#home-address").val();
      var phoneNumInA = $("input#home-phone-number").val();
      var emailInA = $("input#home-email").val();
      if (addressInA == "" && phoneNumInA == "" && emailInA == "") {
        alert("Please fill in the Home contact form in whatever you capacity you are comfortable with, or toggle it off if you don't wish to use it.");
        $("div#contact"+targetID).remove();
        return false;
      }
      else {
        //create append for home address here
        if (addressInA != "") {
          contactMethodA.push(addressInA);
          //create append for home address location here
        }
        if (phoneNumInA != "") {
          contactMethodA.push(phoneNumInA);
          //create append for home phone number here
        }
        if (emailInA != "") {
          contactMethodA.push(emailInA);
          //create append for home email location here
        }
        //push home contact info to overall contact method array from here
      }

    }
    //repeat above if statements twice, once each for work contact and extra contact below here
    var contactMethodB = [];
    var contactMethodC = [];

    $("input#first-name").val("");
    $("input#last-name").val("");
    $("input#phone-number").val("");
    var contactToAdd = new Contact(firstNameIn, lastNameIn, allContactMethods);
    currentAddressBook.addContact(contactToAdd);
    // $("ul#contact-list").append(
    //   "<li id='contact" + currentAddressBook.currentId + "'><button type='button' class='red-button' value='" + currentAddressBook.currentId + "' onClick='removeFromContacts(this.value)'>Delete this.</button> Name: " + contactToAdd.fullName() + ".  Phone Number: " + contactToAdd.phoneNumber + "</li>"
    // );
  });
});
