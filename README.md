# ClassTrack — Student Attendance Manager

A responsive HTML, CSS and JavaScript app showing how arrays help manage student attendance.

## Run
1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. Add students, mark attendance, search/filter, and export attendance as CSV.

No install or internet connection is required for local use. Data is stored in the browser's local storage on that device and is not sent to a server.

## Arrays in this project
- `students`: array of student objects.
- `attendance`: array of attendance records.
- `push()`: adds a student or attendance record.
- `find()`: locates a student's attendance record.
- `filter()`: searches students, calculates totals, and removes records.
- `forEach()`: renders rows and creates CSV output.
- `some()`: checks that student IDs are unique.

## Real-world applications where arrays are useful
1. **Student attendance:** keep a list of students and attendance records; loop through them to mark attendance, count absences, search, and create reports.
2. **Online shopping carts:** hold selected products, quantities, and prices so totals can be calculated and items updated.
3. **Hospital queues:** preserve the order of patients waiting for service and process the next person.
4. **Bank transaction histories:** list transactions in order and calculate summaries or display recent activity.
5. **Weather monitoring:** store readings over time and calculate average, minimum, and maximum temperatures.
6. **Exam results:** hold marks for many students and calculate averages or rankings.
7. **Transport booking:** maintain lists of passengers or seats and update booking status.

## Why arrays are necessary/useful
Arrays keep multiple related items together under one variable. Code can loop through all items, search them, filter them, add or remove entries, and calculate totals. They are especially useful when the program needs an ordered collection. In larger production systems, records may live in a database and be loaded into arrays when needed.

## Deploy online
This is a static site and needs no build command. Upload `index.html`, `style.css`, and `app.js` to a static hosting provider such as GitHub Pages, Netlify, or Cloudflare Pages. Set the folder containing `index.html` as the publish directory. The hosting provider will give you a public URL after you publish.

This package is ready to deploy, but it has not been published to a public hosting account from this environment.
