
export class Doctor {

  getDoctorByName(name) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=wa-seattle&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
      //https://api.betterdoctor.com/2016-03-01/doctors?name=John&first_name=Smith&location=wa-seattle&user_location=wa-seattle&skip=0&limit=10&user_key=fd61530822982e5a3fa1649ea6c353b4
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }


  getDoctorByIssue(issue) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?specialties=${issue}&location=wa-seattle&skip=0&limit=10&user_key=${process.env.exports.apiKey}`;
      //https://api.betterdoctor.com/2016-03-01/doctors?query=${issue}&location=wa-seattle&skip=0&limit=10&apikey=${process.env.exports.apiKey}
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}
