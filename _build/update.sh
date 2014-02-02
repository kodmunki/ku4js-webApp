sh build.sh
sh build_testBundle.sh

echo "Copying resources to _TEMPLATE/"
cp -f ../bin/ku4jQuery-webApp.js ../_TEMPLATE/lib
cp -f ../bin/ku4jQuery-webApp-testBundle.js ../_TEMPLATE/lib

echo "Copying resources to example/"
cp -f ../bin/ku4jQuery-webApp.js ../example/scripts/example/lib/
cp -f ../bin/ku4jQuery-webApp-testBundle.js ../example/scripts/example/tests/_dependencies/

echo "Update complete :{)}"