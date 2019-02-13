# Epicodus Unit 4.0-4.1 Object-Oriented Programming: Address Book

#### Tutorial Project and experiment for Object-Oriented Programming in Epicodus Unit 4.0 to 4.1, 02/13/2019 start date and initial posting.

#### By **Robert James "Jimmy" Gore**

## Description

The primary purpose of this project is to demonstrate early knowledge of JavaScript Object-Oriented Development by following through the tutorial and building a page UI around what was talked about in unit 4.0 for the assignment in 4.1.  This project features a simple form system that provides the user three required inputs for adding contact information: a first name, a last name, and a phone number.  Once all three are filled in and submitted, the program will store that information as a contact in an object and display it on the page.  Additional UI features allow for greater utilization of the project's functions by allowing removal of existing contacts at the click of a button.  Clicking the button next to their respective contact info will remove that contact from the AddressBook object and also will remove it from the display on the page.

## Setup/Installation Requirements

* Install Git Bash for Git repository cloning of the project
* Install Atom for review and edit of Code
* To access repository for project and review code, first clone repository at the appropriate link, then use Git Bash and/or Atom to open the project folder.
* GitHub Pages link is RJGore92.github.io/arrays-and-looping_independent-project

## Known Bugs

No known bugs are present in this project.

## Assignment Specs

1. The program requires three inputs, all text-based.  Leaving any form input blank will prevent the form from sending.
2. The program, upon form submission, will add the three form inputs into a contact object and proceed to add that contact to an internal contact list object called an AddressBook.  Due to the nature of the AddressBook object's variables, this object can be accessed for status viewing in the console as a public object variable called currentAddressBook.
3. Additionally, the project displays this added contact as a list element beneath the input form along with a button.  This button, when clicked, will delete the contact from the currentAddressBook object and also will remove the list element from the page's display.


####  Inputs and outputs (examples):

* Program rejects form if any input is empty. (see "(empty)" as blank inputs).
  * Inputs: "Jimmy", (empty), (empty)
  * Expected output: false (the webpage will tell the user to complete the form by filling out the empty inputs)
* Program accepts form if completed.  Form values are text-based and will accept all values, though care should be taken as to the order of the inputs as displayed on the page.  It should be noted that the instructions of the form should be followed, or the normal output expected will not display properly.  (order of inputs is First Name, Last Name, Phone Number, but program cannot distinguish between the three, so care must be taken to input them in order.  For privacy sake in this readme, the form inputs will be represented by fn, ln, and pn as to not give out the author's own contact information publicly.)
  * Input: fn, ln, pn
  * Expected print: "Name: fn ln.  Phone number: pn"
  * Input: ln, fn, pn
  * Expected print: "Name: ln fn.  Phone number: pn"
  * Input: pn, fn, ln
  * Expected print: "Name: pn fn.  Phone number: ln"

## Technologies Used

* Git Bash
* Atom
* HTML
* MD
* CSS
* Bootstrap
* JavaScript
* jQuery

### License

Copyright (c) 2019 **Robert James "Jimmy" Gore**
