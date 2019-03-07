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

Contact.prototype.showContactMethods = function() {
  return this.contactMethods;
}

// Manipulation functions for UI, Contacts, and Address Book
var subFormOneState = 0;
var subFormTwoState = 0;
var subFormThreeState = 0;

function removeFromContacts(val) {
  currentAddressBook.deleteContact(val)
  console.log(val);
  $("div#contact"+val).remove();
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

function confirmValidInput(stringIn) {
  var stringToCheck = stringIn;
  var stringSplit = stringToCheck.split("");
  for (var i = 0; i < stringSplit.length; i++) {
    if (stringSplit[i] != " ") {
      return true;
    }
  }
  return false;
}

function showDetailsOfContact(id) {
  $("div#contact-body"+id).slideToggle();
}

function logSpecificDetails(id) {
  var targetContact = currentAddressBook.findContact(id);
  var targetContactMethods = targetContact.showContactMethods();
  var infoToSeek = $("select#log-check"+id).val();
  console.log(infoToSeek);
  console.log(id);
  var targetInfo = [];
  if (infoToSeek == "home" || infoToSeek == "work" || infoToSeek == "extra") {
    for (var i = 0; i < targetContactMethods.length; i++) {
      if (targetContactMethods[i].includes(infoToSeek)) {
        console.log(targetContactMethods[i]);
        return targetContactMethods[i];
      }
    }
    alert("The contact information you requested is not within this contact.")
    return false;
    
  }
  else {
    alert("Please input one of the following values exactly for this button to log what you are seeking: home, work, extra")
    return false;
  }
}


// User Interface logic

$(document).ready(function() {

  $("form#add-contact-info").submit(function(event) {
    event.preventDefault();
    var targetID = (currentAddressBook.currentId + 1);
    $("div#output-div").append("<div id='contact" + targetID + "' class='col-md-12'>" +
        "<div class='card px-2 py-1'>" +
          "<div class='card-heading bg-primary' id='card-header" +  targetID + "'><h3><span id='name" + targetID +"'></span></h3>"+
            "<div id='button"+targetID+"'><button type='button' value='"+targetID+"' onClick='removeFromContacts(this.value)'>Remove this Contact</button><br><button type='button' value='"+targetID+"' onClick='showDetailsOfContact(this.value)'>Show Details</button></div>" +
            "<div id='log-form" + targetID + "><form id='text-search" + targetID + "'><select id='log-check"+targetID+"'>"+
            "<option value='home'>home</option>"+
          	"<option value='work'>work</option>"+
            "<option value='extra'>extra</option></select>"+
            "</form><button type='button' value='" + targetID + "' onClick='logSpecificDetails(this.value)'>Search For Details</button></div></div>" +
          "<div class='card-body bg-muted hidden-start' id='contact-body"+targetID+"'>" +
            "<div class='row' id='contact-details" + targetID + "'></div>" +
          "</div></div></div>");
    var firstNameIn = $("input#first-name").val();
    var lastNameIn = $("input#last-name").val();
    $("span#name"+targetID).text(firstNameIn + " " + lastNameIn);
    var allContactMethods = [];
    if (subFormOneState == 1 || subFormTwoState == 1 || subFormThreeState == 1) {
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
        else if (!(confirmValidInput(addressInA) || confirmValidInput(phoneNumInA) || confirmValidInput(emailInA))) {
          alert("Please fill in the Home contact form in whatever you capacity you are comfortable with, or toggle it off if you don't wish to use it.");
          $("div#contact"+targetID).remove();
          return false;
        }
        else {
          contactMethodA.push("home");
          $("div#contact-details"+targetID).append(
            "<div class='col-md-4' id='home-contact" + targetID +"'>"
          );
          if (confirmValidInput(addressInA)) {
            contactMethodA.push(addressInA);
            $("div#home-contact"+targetID).append(
              "<h6>Home Address:</h6><br><p>" + addressInA + "</p>"
            );
            if (confirmValidInput(phoneNumInA) || confirmValidInput(emailInA)) {
              $("div#home-contact"+targetID).append(
                "<hr>"
              );
            }
          }
          if(confirmValidInput(phoneNumInA)) {
            contactMethodA.push(phoneNumInA);
            $("div#home-contact"+targetID).append(
              "<h6>Home Phone Number:</h6><br><p>" + phoneNumInA + "</p>"
            );
            if (confirmValidInput(emailInA)) {
              $("div#home-contact"+targetID).append(
                "<hr>"
              );
            }
          }
          if (confirmValidInput(emailInA)) {
            contactMethodA.push(emailInA);
            $("div#home-contact"+targetID).append(
              "<h6>Home E-mail Address:</h6><br><p>" + emailInA + "</p>"
            );
          }
          allContactMethods.push(contactMethodA);
        }
      }
      if (subFormTwoState == 1) {
        var contactMethodB = [];
        var addressInB = $("input#work-address").val();
        var phoneNumInB = $("input#work-phone-number").val();
        var emailInB = $("input#work-email").val();
        if (addressInB == "" && phoneNumInB == "" && emailInB == "") {
          alert("Please fill in the work contact form in whatever you capacity you are comfortable with, or toggle it off if you don't wish to use it.");
          $("div#contact"+targetID).remove();
          return false;
        }
        else if (!(confirmValidInput(addressInB) || confirmValidInput(phoneNumInB) || confirmValidInput(emailInB))) {
          alert("Please fill in the work contact form in whatever you capacity you are comfortable with, or toggle it off if you don't wish to use it.");
          $("div#contact"+targetID).remove();
          return false;
        }
        else {
          contactMethodB.push("work");
          $("div#contact-details"+targetID).append(
            "<div class='col-md-4' id='work-contact" + targetID +"'>"
          );
          if (confirmValidInput(addressInB)) {
            contactMethodB.push(addressInB);
            $("div#work-contact"+targetID).append(
              "<h6>Work Address:</h6><br><p>" + addressInB + "</p>"
            );
            if (confirmValidInput(phoneNumInB) || confirmValidInput(emailInB)) {
              $("div#work-contact"+targetID).append(
                "<hr>"
              );
            }
          }
          if(confirmValidInput(phoneNumInB)) {
            contactMethodB.push(phoneNumInB);
            $("div#work-contact"+targetID).append(
              "<h6>Work Phone Number:</h6><br><p>" + phoneNumInB + "</p>"
            );
            if (confirmValidInput(emailInB)) {
              $("div#work-contact"+targetID).append(
                "<hr>"
              );
            }
          }
          if (confirmValidInput(emailInB)) {
            contactMethodB.push(emailInB);
            $("div#work-contact"+targetID).append(
              "<h6>Work E-mail Address:</h6><br><p>" + emailInB + "</p>"
            );
          }
          allContactMethods.push(contactMethodB);
        }

      }
      if (subFormThreeState == 1) {
        var contactMethodC = [];
        var phoneNumInC = $("input#extra-phone-number").val();
        var emailInC = $("input#extra-email").val();
        if (phoneNumInC == "" && emailInC == "") {
          alert("Please fill in the external contact form in whatever you capacity you are comfortable with, or toggle it off if you don't wish to use it.");
          $("div#contact"+targetID).remove();
          return false;
        }
        else if (!(confirmValidInput(phoneNumInC) || confirmValidInput(emailInC ))) {
          alert("Please fill in the external contact form in whatever you capacity you are comfortable with, or toggle it off if you don't wish to use it.");
          $("div#contact"+targetID).remove();
          return false;
        }
        else {
          contactMethodC.push("extra");
          $("div#contact-details"+targetID).append(
            "<div class='col-md-4' id='extra-contact" + targetID +"'>"
          );
          if(confirmValidInput(phoneNumInC)) {
            contactMethodC.push(phoneNumInC);
            $("div#extra-contact"+targetID).append(
              "<h6>External Phone Number:</h6><br><p>" + phoneNumInC + "</p>"
            );
            if (confirmValidInput(emailInC)) {
              $("div#extra-contact"+targetID).append(
                "<hr>"
              );
            }
          }
          if (confirmValidInput(emailInC)) {
            contactMethodC.push(emailInC);
            $("div#extra-contact"+targetID).append(
              "<h6>External E-mail Address:</h6><br><p>" + emailInC + "</p>"
            );
          }
          allContactMethods.push(contactMethodC);
        }
      }
    }
    else {
      alert("Please select at least one form of contact to fill out so we have more than just a name.")
      $("div#contact"+targetID).remove();
      return false;
    }

    $("input#first-name").val("");
    $("input#last-name").val("");
    $("input#home-address").val("");
    $("input#home-phone-number").val("");
    $("input#home-email").val("");
    $("input#work-address").val("");
    $("input#work-phone-number").val("");
    $("input#work-email").val("");
    $("input#extra-phone-number").val("");
    $("input#extra-email").val("");
    var contactToAdd = new Contact(firstNameIn, lastNameIn, allContactMethods);
    currentAddressBook.addContact(contactToAdd);
    // $("ul#contact-list").append(
    //   "<li id='contact" + currentAddressBook.currentId + "'><button type='button' class='red-button' value='" + currentAddressBook.currentId + "' onClick='removeFromContacts(this.value)'>Delete this.</button> Name: " + contactToAdd.fullName() + ".  Phone Number: " + contactToAdd.phoneNumber + "</li>"
    // );
  });
});
