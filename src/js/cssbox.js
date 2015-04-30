window.addEventListener('load', function()
{
	var	whichTransitionEvent = function()
		{
			var	t,
				el = document.createElement('fakeelement'),
				transitions = {
					'transition':'transitionend',
					'OTransition':'oTransitionEnd',
					'MozTransition':'transitionend',
					'WebkitTransition':'webkitTransitionEnd'
				}
			
			for(t in transitions)
			{
				if(el.style[t] !== undefined)
				{
					return transitions[t];
				}
			}
		},
		getStyle = function(elem, prop)
		{
			if(window.getComputedStyle)
			{
				return getComputedStyle(elem).getPropertyValue(prop);
			}
			//IE
			else if(elem.currentStyle)
			{
				try
				{
					return elem.currentStyle[prop];
				}
				catch(e){}
			}
			
			return '';
		},
		transitionEndEvent = whichTransitionEvent(),
		anyBoxOpen = false,
		currentBox = null,
		radios = document.getElementsByClassName('cssbox-select');
		
	for(var i=0; i<radios.length; i++)
	{
		radios[i].addEventListener('change', function(event)
		{
			if(event.target.className.split(/\s/).indexOf('close') > -1)
			{
				if(currentBox)
				{
					currentBox.dispatchEvent(new Event('closeStart'));
					
					if(getStyle(currentBox, 'transition-property').length > 0 && getStyle(currentBox, 'transition-property') != 'all')
					{
						currentBox.addEventListener(transitionEndEvent, function onCSSBoxTransitionEnd(event)
						{
							if(event.target == event.currentTarget)
							{
								anyBoxOpen = false;
								event.target.removeEventListener(transitionEndEvent, onCSSBoxTransitionEnd);
								event.target.dispatchEvent(new Event('closeEnd'));
							}
						}, false);
					}
					else
					{
						anyBoxOpen = false;
						currentBox.dispatchEvent(new Event('closeEnd'));
					}
					
					currentBox = null;
				}
			}
			else
			{
				var nextSibling = event.target.nextSibling;
				while(nextSibling && nextSibling.nodeType != 1)
				{
					nextSibling = nextSibling.nextSibling
				}
				
				currentBox = nextSibling;
				
				if(currentBox)
				{
					var eventType = (!anyBoxOpen ? 'open' : 'switch');
					currentBox.dispatchEvent(new Event(eventType + 'Start'));
					
					if(getStyle(currentBox, 'transition-property').length > 0 && getStyle(currentBox, 'transition-property') != 'all')
					{
						currentBox.addEventListener(transitionEndEvent, function onCSSBoxTransitionEnd(event)
						{
							if(event.target == event.currentTarget)
							{
								anyBoxOpen = true;
								event.target.removeEventListener(transitionEndEvent, onCSSBoxTransitionEnd);
								event.target.dispatchEvent(new Event(eventType + 'End'));
							}
						}, false);
					}
					else
					{
						anyBoxOpen = true;
						currentBox.dispatchEvent(new Event(eventType + 'End'));
					}
				}
			}
			
		}, false);
	}
}, false);