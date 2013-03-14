

include package.mk


.PHONY: test


all: compile
all: SIZE=$(shell cat $(FILE_MIN) | wc -c)
all: SIZE_GZ=$(shell gzip -c $(FILE_MIN) | wc -c)
all:
	@printf "Original Size %s Compiled Size %s or %s gzipped\n" \
	        "$$(cat $(FILE) | wc -c) bytes" \
	        "$(SIZE) bytes" \
	        "$(SIZE_GZ) bytes"
	@sed -i '/ bytes or .* gzipped/s/.*/($(SIZE) bytes or $(SIZE_GZ) bytes gzipped)/' README.md 

compile:
	# Call Google Closure Compiler to produce a minified version
	@curl -s \
		    --data-urlencode 'output_info=compiled_code' \
				--data-urlencode 'output_format=text' \
				--data-urlencode 'js_code@$(FILE)' \
				'http://closure-compiler.appspot.com/compile' > $(FILE_MIN)

error:
	@curl -s \
		    --data-urlencode 'output_info=errors' \
				--data-urlencode 'output_format=text' \
				--data-urlencode 'js_code@$(FILE)' \
				'http://closure-compiler.appspot.com/compile'

test:
	@node test/run.js

