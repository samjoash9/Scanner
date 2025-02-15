INSTALLATION: 

cd frontend

npm i 

cd ..

npm i

npm install electron --save-dev

npm install electron-builder --save-dev

npm run start

PRODUCTION: 

cd backend

python manage.py collectstatic --noinput

cd ..

npm install --save-dev electron-packager

npx electron-packager . MyApp --platform=win32 --arch=x64 --out=dist
