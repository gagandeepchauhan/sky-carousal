# Image Carousal Maker

Deployed at - https://sky-carousal.web.app  (client)
server - https://sky-carousal.herokuapp.com

It is a simple carousal maker, that consumes unsplash API to load images
falling under different category. Using it any one can create carousal containing 
mixed category images, and then export the JSON object containing URL's of images
contained inside carousal created.

## Stack 

	1. Frontend - Reactjs
	2. Backend - Nodejs

Backend API is hardcoded, after fetching from unsplash Demo API.
However new categories can also be created other than those were hardcoded on server.

### Routes

Route request are sampled in server/request.rest file also, these are -

	1. /categories/ - returns the list of available categories on server from hardcoded data
	2. /categories/:category?page=&limit= - returns the paginated photos under the provided category from hardcoded data
	3. /categories/fetch-category?query=categoryname&limit=25&page=1 - returns the paginated photos under specified category, but this time it fetches that from unsplash instead of returning from hardcoded ones and then it adds this new category in hardcoded data also. If category already exist in hardcoded data then it appends the returned data otherwise it creates a new entry for this category.

### Exported JSON format

Exported JSON format is of the form -

	[
		{
			description: image description,
			urls:{
				regular: https://regular-image-url,
				small: https://small-image-url
			}
		},
		...
	]

### How to run at locahost 

First clone the repo then follow below steps - 

	1. go to the project directory
	2. go to client folder -> cd client and run -> npm install
	3. return to project directory and go to server folder -> cd server and run -> npm install
	4. return to project directory and run below commands
	5. run -> server_script.sh ( on windows ) or ./server_script.sh ( linux ) 
	6. run -> client_script.sh

### Files

	1. server_script.sh - contains script to start server at localhost
	2. client_script.sh - contains script to start client-dev-server at localhost

Note : server must be started before client side.

#### Remember to add ACCESS_KEY=<your unsplash access key> environment variable in your localhost, because this will need when you want to have that feature works which creates a category, since it needs to call unsplash API then.

##### you can add one line in your server_script.sh file (line after we export CORS_URL) as -> export ACCESS_KEY=<your access key>  