import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

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
        for (let i = 0; i < body._embedded.events.length; i++) {
            $('.doctorsList').append(`<br>${body.doctors[i].name}`);
            //$('.doctorsList').append(`--- Date: ${body._embedded.events[i].dates.start.localDate}`);
        }
    }, function (error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);

    });
});

});
