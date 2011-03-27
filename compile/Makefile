#!/usr/bin/make -f
# -*- makefile -*-

closure_compiler.jar :
	wget http://closure-compiler.googlecode.com/files/compiler-latest.zip
	unzip compiler-latest.zip compiler.jar
	rm compiler-latest.zip
	mv compiler.jar closure_compiler.jar

yuicompressor.jar :
	wget http://yuilibrary.com/downloads/yuicompressor/yuicompressor-2.4.2.zip
	unzip yuicompressor-2.4.2.zip yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar
	mv yuicompressor-2.4.2/build/yuicompressor-2.4.2.jar yuicompressor.jar
	rmdir yuicompressor-2.4.2/build/ yuicompressor-2.4.2
	rm yuicompressor-2.4.2.zip

jquery-1.5.1.min.js : closure_compiler.jar
	wget -O jquery-1.5.1.min.headed.js http://code.jquery.com/jquery-1.5.1.min.js
	java -jar closure_compiler.jar --js_output_file $@ --js jquery-1.5.1.min.headed.js \
		--compilation_level WHITESPACE_ONLY
	rm jquery-1.5.1.min.headed.js

clean :
	rm -f closure_compiler.jar yuicompressor.jar jquery-1.5.1.min.js

.PHONY : clean
