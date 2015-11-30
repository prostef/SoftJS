sf.drag = function (callback, hadsMovers, dropPlaces, connectAttr) {
	var dragEvents = [];

	hadsMovers.attr('draggable', 'true');
	hadsMovers.addEv('dragstart', function(event) {
		var event = event ? event : window.event;
		var dt = event.dataTransfer;
		var marker = sf(this);
		var dragObject = !connectAttr ? marker : sf('[' + connectAttr + '="object-' + marker.attr(connectAttr) + '"]');

		dt.setDragImage(dragObject[0], event.layerX, event.layerY);
		dt.setData('text', marker.attr('data-id'));
		dragObject.css('opacity', '0.4');
		dropPlaces.css('border-left', '5px solid rgba(0, 41, 158, 0.3)');
		dropPlaces.css('background-color', 'rgba(156, 223, 255, 0.2)');
	});

	dropPlaces.addEv('dragover', function() {
		var place = sf(this);
		var id = place.attr('data-id');

		place.css('background-color', 'rgba(156, 223, 255, 0.7)');
		dragEvents['dragleave' + id] = dragEvents['dragleave' + id] ? dragEvents['dragleave' + id] : place.addEv('dragleave', function() {
			place.css('background-color', 'rgba(156, 223, 255, 0.2)');
		});

		dragEvents['dragover' + id] = dragEvents['dragover' + id] ? dragEvents['dragover' + id] : place.addEv('dragover', function(event) {
			var event = event ? event : window.event;
			event.preventDefault();
		});
		
		dragEvents['drop' + id] = dragEvents['drop' + id] ? dragEvents['drop' + id] : place.addEv('drop', callback);
	});

	hadsMovers.addEv('dragend', function() {
		var marker = sf(this);
		var dragObject = !connectAttr ? marker : sf('[' + connectAttr + '="object-' + marker.attr(connectAttr) + '"]');

		dragObject.css('opacity', '1');
		dropPlaces.style = '';
	});
}
