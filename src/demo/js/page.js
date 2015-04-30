window.addEventListener('load', function()
{
	var boxes = document.getElementsByClassName('cssbox-box');
	for(var i=0; i<boxes.length; i++)
	{
		['openStart', 'openEnd', 'switchStart', 'switchEnd', 'closeStart', 'closeEnd'].forEach(function(eventType)
		{
			boxes[i].addEventListener(eventType, function(event)
			{
				console.log(event);
			}, false);
		});
	}
});