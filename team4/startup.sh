echo "########################## pull updates ##########################"
git pull

echo "########################## build react app ##########################"
cd frontend
npm i && npm run build || exit

echo "########################## start server ##########################"
cd ../backend
waitress-serve --port=80 "main:app"
