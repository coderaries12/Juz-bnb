<!--!!START SILENT -->
# Juz-bnb
      
Juz-bnb is a soft clone of Airbnb. 
* Implemented full CRUD functionality within an application using REDUX and REACT.js to create, retrieve, update and delete data dynamically.
* Integrated user authentication and Bcrypt.js for secure password hashing and a safe and protected user experience.
* Implemented session authentication to check permissions when enabling edit and delete feats. All delete buttons were dynamic, allowing users to delete review or spot without the need to reload using event listener and a fetch request.
* Managed and stored data through Express.js and SQL to ease the data flow queries from user interactions.


Check out [Juzbnb](https://authenticate-me-4sxd.onrender.com) 

## Technologies Used

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />

## List of Spots

<img width="1464" alt="Juz-bnb-listofspots-page" src="https://github.com/coderaries12/API-project/assets/30429957/560a2672-97ce-488d-8605-a5afaf782f6a">


## Spot Information and reviews

<img width="1458" alt="Juz-bnb-spotdetail-page" src="https://github.com/coderaries12/API-project/assets/30429957/6ff1f409-d2a7-4403-b761-c930b68619c9">


# Features 

## Spots
* Users can create a Spot
* Users can read/view other Spot
* Users can update their Spot
* Users can delete their Spot

## Reviews
* Users can create Reviews on Spots
* users can read/view all of the Reviews on a Spot
* Users can delete their Review(s) on a Spot

## Future Features
## Bookings
Logged-in Users can
* Create a booking at a spot
* Update their booking at a spot
* Read all of their bookings
* Delete/Cancel their booking

## AWS
Logged-in Users can
* Upload multiple images of their spot to AWS S3

### Google Maps Api
Logged in Users can
* Locate their spot with Google Maps Api 


## Database Schema Design

<!--!!START SILENT -->
![airbnb-database-schema]

[airbnb-database-schema]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-12/airbnb-db-schema.png
[airbnb-db-diagram-info]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-12/airbnb-db-diagram-info.txt
<!--!!END -->
<!--!!ADD -->
<!-- `<insert database schema design here>` -->
<!--!!END_ADD -->

## API Documentation

- [API Documentation](./API.md)

