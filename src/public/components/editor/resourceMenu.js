export class ImageMenu {

	constructor() {
		this.title = '图片'
		this.tag = 'button'
	}

	isActive(editor) {
		return false
	}

	getValue(editor) {
		return false 
	}

	isDisabled(editor) {
		return false
	}

	exec(editor, value) {
		editor.emit('ImageMenuClick')
	}
}

