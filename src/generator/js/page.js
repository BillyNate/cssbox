jQuery().ready(function()
{
	var
		i = 0,
		params = ['boxstyle', 'transition', 'spinner'],
		headTags = '';
		setConfig = function()
		{
			headTags = $('<link>').attr({ rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/cssbox/1.0.0/cssbox.css' }).prop('outerHTML');
			
			for(i=0; i<params.length; i++)
			{
				if(['boxstyle', 'transition'].indexOf(params[i]) > -1)
				{
					$('link.' + params[i]).attr({ 'href': '' });
					if($('input[name="' + params[i] + '"]:checked').length > 0)
					{
						$('link.' + params[i]).attr({ 'href': '../dist/css/' + params[i] + $('input[name="' + params[i] + '"]').filter(':checked').val() + '.css' });
						headTags += '\n' + $('<link>').attr({ rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/cssbox/1.0.0/' + params[i] + $('input[name="' + params[i] + '"]').filter(':checked').val() + '.css' }).prop('outerHTML');
					}
				}
				else if(params[i] == 'spinner')
				{
					$('body').removeClass(function(index, css)
					{
						return (css.match(/(^|\s)loader-animation-\S+/g) || []).join(' ');
					});
					
					if($('input[name="' + params[i] + '"]:checked').length > 0)
					{
						$('body').addClass('loader-animation-' + $('input[name="' + params[i] + '"]').filter(':checked').val());
						$('link.load' + $('input[name="' + params[i] + '"]').filter(':checked').val()).insertBefore($('link.load').first());
						headTags += '\n' + $('<link>').attr({ rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/css-spinning-spinners/1.1.0/load' + $('input[name="spinner"]').filter(':checked').val() + '.css' }).prop('outerHTML');
					}
				}
			}
			$('textarea.head').text(headTags);
		};
	$('label.pick').click(function(event)
	{
		if($('input#' + $(this).attr('for')).is(':checked'))
		{
			event.preventDefault();
			$('input#' + $(this).attr('for')).prop({ checked: false });
			setConfig();
		}
	});
	$('input[type="radio"]').change(function(event)
	{
		setConfig();
	});
	$('button.test').click(function()
	{
		setConfig();
		$('input.cssbox-select').filter('[value=1]').prop({ 'checked': true });
	});
	$('button.twitter').click(function()
	{
		var
			width	= 575,
			height	= 400,
			left	= ($(window).width()  - width)  / 2,
			top		= ($(window).height() - height) / 2;
		
		window.open('https://twitter.com/intent/tweet?hashtags=cssbox', 'twitter', 'status=1,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left);
	});
	$('button.facebook').click(function()
	{
		var
			width	= 575,
			height	= 400,
			left	= ($(window).width()  - width)  / 2,
			top		= ($(window).height() - height) / 2;
		
		window.open('https://www.facebook.com/sharer/sharer.php?u=https://github.com/BillyNate/cssbox', 'facebook', 'status=1,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left);
	});
	$('textarea').click(function()
	{
		$(this).focus().select();
	});
	setConfig();
});