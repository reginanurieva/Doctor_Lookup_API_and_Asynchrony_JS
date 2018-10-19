import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Doctor } from './doctors';

$(document).ready(function() {

  $('#doctorForm').submit(function(event) {
    event.preventDefault();
    let searchDoctor = $('#doctor').val();
    let allDoctors = new Doctor();
    let promise = allDoctors.getDoctorByName(searchDoctor);

    promise.then(function (response) {
      let body = JSON.parse(response);
      console.log(body);

      $('.doctorsList').text(`Doctors in your area ${searchDoctor}:`);
      for (let i = 0; i < body.data.length; i++) {
        $('.doctorsList').append(`<h2><br>${body.data[i].profile.first_name} `+`${body.data[i].profile.last_name}`+`<br></h2><br><h4>Gender: </h4> ${body.data[i].profile.gender}`+` <br> <h4>Phone number:</h4>
          ${body.data[i].practices[0].phones[0].number}<br> <h4> Address: </h4>`+`
          ${body.data[i].practices[0].visit_address.street}<br>`+`
          ${body.data[i].practices[0].visit_address.city}<br>`+`<h4> Web-Site:</h4> `+`
          ${body.data[i].practices[0].website} `+` <h4>Accepting New Patients:</h4> `+` ${body.data[i].practices[0].accepts_new_patients}`);
          //$('.doctorsList').append(`--- Date: ${body._embedded.events[i].dates.start.localDate}`);
        }
      }, function (error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);

      });
    });


    $('#issueForm').submit(function(event) {
    event.preventDefault();
    let searchIssue = $('#issue').val();
    let docsList = new Doctor();
    let promise = docsList.getDoctorByIssue(searchIssue);

    promise.then(function (response) {
        let body = JSON.parse(response);
        console.log(body);

        $('.doctorsList').text(`Doctors who can help with ${searchIssue}:`);
        for (let i = 0; i < body.data.length; i++) {
            $('.doctorsList').append(`<h2><br>${body.data[i].profile.first_name} `+`${body.data[i].profile.last_name}`+`<br></h2><br><h4>Gender: </h4> ${body.data[i].profile.gender}`+` <br> <h4>Phone number:</h4>
              ${body.data[i].practices[0].phones[0].number}<br> <h4> Address: </h4>`+`
              ${body.data[i].practices[0].visit_address.street}<br>`+`
              ${body.data[i].practices[0].visit_address.city}<br>`+` <h4>Accepting New Patients:</h4> `+` ${body.data[i].practices[0].accepts_new_patients}`+`<br>${body.data[i].specialties[0].description}`);
            //$('.doctorsList').append(`--- Date: ${body._embedded.events[i].dates.start.localDate}`);
        }
    }, function (error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);

    });
});

  });
