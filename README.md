<h1>Readme</h1>

<h2>Application Setup and Installation</h2>

<p>To run the application, there are two ways you can choose from:</p>

<h3>Option 1: Using Docker Compose</h3>

<ol>
  <li>Clone this repository to your local machine:<br>
    <code>git clone &lt;repository_url&gt;</code></li>
  <li>Change your current directory to the cloned repository:<br>
    <code>cd &lt;repository_directory&gt;</code></li>
  <li>Run Docker Compose to build and start the application containers:<br>
    <code>docker-compose up -d</code></li>
  <li>Access the application by navigating to <code>http://localhost:3003</code> in your web browser.<br>
    <strong>Note:</strong> Please refer to the Docker Compose file or the project's documentation for other exposed ports, including the database.</li>
  <li>If you need to connect to the database, use the credentials specified in the Docker Compose file.</li>
</ol>

<h3>Option 2: Building the Application Locally</h3>

<p><strong>Note:</strong> This option is more challenging and requires manual setup. It is recommended for advanced users.</p>

<ol>
  <li>Install the necessary dependencies and requirements for the application, including Node.js, NestJS, and other dependencies. Please refer to the project's documentation for detailed instructions.</li>
  <li>Clone this repository to your local machine:<br>
    <code>git clone &lt;repository_url&gt;</code></li>
  <li>Change your current directory to the cloned repository:<br>
    <code>cd &lt;repository_directory&gt;</code></li>
  <li>Create an <code>.env</code> file in the root directory of the project with the following contents:<br>
    <pre>DB_HOST=your_host
DB_PORT=your_port
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_name

IMG_API_KEY=apikeyfor-freeimage.host</pre>
    Replace the placeholders (<code>your_host</code>, <code>your_port</code>, <code>your_username</code>, <code>your_password</code>, <code>your_name</code>, <code>apikeyfor-freeimage.host</code>) with the appropriate values for your environment.</li>
  <li>Run the following command to install the project dependencies:<br>
    <code>npm install</code></li>
  <li>Generate the migration database schema by running the following command:<br>
    <code>npm run migration:generate -- db/migrations/myschema</code><br>
    This command will create a schema of the database and place it in the <code>db/migrations</code> folder.</li>
  <li>Create an empty migration file using the following command:<br>
    <code>npx typeorm migration:create db/migrations/dummydata</code></li>
  <li>Open the <code>dummy-data-manual-setup.ts</code> file located in the root directory copy  <code>up</code> and <code>down</code> methods and  place to the newly generated empty migration file. (from previous step) </li>
  <li>Once you have defined the migration logic, you can run the migration using the following command:<br>
    <code>npm run migration:run</code><br>
    This command will execute the migration and apply the changes to the database.</li>
  <li>Once the migration is complete, you can start the application by running the following command:<br>
    <code>npm start</code><br>
    This command will start the application and test the connection to the configured database using the provided credentials.</li>
  <li>Monitor the terminal or command prompt for any log messages or errors related to the application startup or database connection.</li>
  <li>If the application starts successfully and the database connection is established, you should see a message indicating that the application is running and ready to accept requests.</li>
  <li>Access the application by navigating to <code>http://localhost:3003</code> in your web browser.<br>
    <strong>Note:</strong> Make sure to use the appropriate port number if you have configured a different port in your <code>.env</code> file.</li>
</ol>

<h2>Additional Notes</h2>

<ul>
  <li>Make sure you have Docker and Docker Compose installed on your machine for Option 1.</li>
  <li>For Option 2, ensure that your local environment meets all the necessary requirements for building and running the application.</li>
  <li>The hashed password value for every single password in the application is set to "password" for testing purposes.</li>
</ul>

<p>For any further assistance or issues, please contact the project maintainer(s) or refer to the project's documentation.</p>
