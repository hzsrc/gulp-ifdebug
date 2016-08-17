# gulp-ifdebug

A conditional compling plugin for gulp. You can easily output two different codes for debug or release with one source code.

一个用于实现条件编译的gulp插件。可以很容易用一套代码实现debug和release两套不同js代码的输出。

###Usage in JS files
Just use it like this:

这样用就行：

    /*IFDEBUG Any js here FIDEBUG*/

Start with "/\*IFDEBUG", end with"FIDEBUG\*/", and js code in the center. you can use it any where in js files. 

以“/\*IFDEBUG”开头，以“FIDEBUG\*/”结尾，中间是js代码。可以用在js文件的任意地方。

eg:

	$state.go('win', {dir: menu.winId /*IFDEBUG , reload: true FIDEBUG*/})
or

	var tx = "This is app/*IFDEBUG of debugFIDEBUG*/ here";
or

	/*IFDEBUG
		alert('Hi~');
	FIDEBUG*/

Since it is a comment style, the code can run normaly even though gulp-ifdebug is not processed.

因为是注释的形式，故即使不运行gulp-ifdebug，也不影响js代码的运行。

###Config in gulp
You should call this plugin before other js file processes, like this:

需要在js文件的其他处理过程之前调用此插件，像这样：

	gulp.task('js', function () {
    	return gulp.src(sources)
	        .pipe($.ifdebug(  {isDebug: !isProduction}  ))
	        ...pipe other processes...
	});

##options
- isDebug: {bool = true}

	If isDebug === false, all the codes between "/\*IFDEBUG" and "FIDEBUG\*/" will be removed, otherwise the codes will be remained.
	
	如果isDebug === false，所有"/\*IFDEBUG" 和 "FIDEBUG\*/"之间的代码都会被移除。 其他情况的isDebug，这些代码则会被保留。 
	