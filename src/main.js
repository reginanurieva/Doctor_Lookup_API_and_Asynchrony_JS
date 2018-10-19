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
        $('.doctorsList').append(`<br>${body.data[i].profile.first_name} `+`${body.data[i].profile.last_name}`+`<br> ${body.data[i].profile.gender}`+`<br>
          ${body.data[i].practices[0].phones[0].number}<br>`+`${body.data[i].practices[0].visit_address.city}`);
          //$('.doctorsList').append(`--- Date: ${body._embedded.events[i].dates.start.localDate}`);
        }
      }, function (error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);

      });
    });

  });
