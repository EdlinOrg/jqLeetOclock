describe("jqLeetOclock.leetIt", function() {
	 beforeEach(function () {
			unitTestHelper = jQuery.fn.leetOclock('unitTestHelper');
	  });

	it("can convert text", function() {
		var leetIt = unitTestHelper['leetIt'];
		expect(leetIt("elite")).toEqual("1337");
	});

});

describe("jqLeetOclock.calcTimeUntilTimeout", function() {

	 beforeEach(function () {
			unitTestHelper = jQuery.fn.leetOclock('unitTestHelper');
			calcTimeUntilTimeoutOrg = unitTestHelper['calcTimeUntilTimeout'];

			calcTimeUntilTimeout = function(h,m,s){
				return calcTimeUntilTimeoutOrg(h,m,s,13,37,0);
			}
	  });
	
	it("can tell ms to leet o clock", function() {

		var expectedOutput = expTimeInMs(2, 7, 0);
		expect(calcTimeUntilTimeout(11, 30, 0)).toEqual(expectedOutput);

		expectedOutput = expTimeInMs(2, 6, 45);
		expect(calcTimeUntilTimeout(11, 30, 15)).toEqual(expectedOutput);

		expectedOutput = expTimeInMs(2, 6, 1);
		expect(calcTimeUntilTimeout(11, 30, 59)).toEqual(expectedOutput);

		expectedOutput = expTimeInMs(0, 6, 1);
		expect(calcTimeUntilTimeout(13, 30, 59)).toEqual(expectedOutput);

		expectedOutput = expTimeInMs(0, 0, 1);
		expect(calcTimeUntilTimeout(13, 36, 59)).toEqual(expectedOutput);

		expectedOutput = expTimeInMs(2, 0, 0);
		expect(calcTimeUntilTimeout(11, 37, 0)).toEqual(expectedOutput);

		expectedOutput = expTimeInMs(1, 57, 0);
		expect(calcTimeUntilTimeout(11, 40, 0)).toEqual(expectedOutput);

		expectedOutput = expTimeInMs(1, 56, 45);
		expect(calcTimeUntilTimeout(11, 40, 15)).toEqual(expectedOutput);

		expectedOutput = expTimeInMs(13, 38, 0);
		expect(calcTimeUntilTimeout(23, 59, 0)).toEqual(expectedOutput);

		expectedOutput = expTimeInMs(14, 38, 0);
		expect(calcTimeUntilTimeout(22, 59, 0)).toEqual(expectedOutput);

		expectedOutput = expTimeInMs(15, 16, 23);
		expect(calcTimeUntilTimeout(22, 20, 37)).toEqual(expectedOutput);

		expectedOutput = expTimeInMs(0, 0, 0);
		expect(calcTimeUntilTimeout(13, 37, 0)).toEqual(expectedOutput);

		expectedOutput = expTimeInMs(23, 59, 59);
		expect(calcTimeUntilTimeout(13, 37, 1)).toEqual(expectedOutput);

	});

	function expTimeInMs(hours, mins, seconds) {
		return (hours * 60 * 60 + mins * 60 + seconds) * 1000;
	}

});