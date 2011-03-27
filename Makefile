#!/usr/bin/make -f
# -*- makefile -*-

compile/closure_compiler.jar :
	make -C compile closure_compiler.jar
compile/yuicompressor.jar :
	make -C compile yuicompressor.jar
compile/jquery-1.5.1.min.js :
	make -C compile jquery-1.5.1.min.js

min/algo.css : algo.css compile/yuicompressor.jar
	java -jar compile/yuicompressor.jar --type css -o $@ $<

js_source := $(wildcard algo.js/*)
min/algo.js : $(js_source) compile/closure_compiler.jar
	java -jar compile/closure_compiler.jar --js_output_file $@ \
		$(foreach s,$(js_source),--js $(s)) \
		--compilation_level SIMPLE_OPTIMIZATIONS

min/algo.html : algo.html min/algo.css min/algo.js compile/jquery-1.5.1.min.js LICENSE
	python compile/pack.py

clean :
	make -C compile clean
	rm -f min/algo.html min/algo.js min/algo.css

.PHONY : clean
.DEFAULT_GOAL := min/algo.html
