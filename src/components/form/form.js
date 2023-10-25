import Component from '../../app/js/base/Component';

class Form extends Component {
    form;
    submitButton;
    constructor(element) {
        super(element);

        this.form = this.getElement("inner");
        this.submitButton = this.getElement("button-submit");

        this.form.addEventListener("submit", this.handlingSubmitEvent)
    }

    onSuccess = () => {
        console.log(this.submitButton)
        this.submitButton.disabled = true;
    };

    sendData = (formData, onSuccess) => {
        fetch("/form", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: formData,
        })
            .then((response) => {
                if(response.ok) {
                    onSuccess();
                }
            })
            .catch((error) => {
                console.log(error);
            })

    };

    handlingSubmitEvent = (e) => {
        e.preventDefault();
        let formData = new FormData(this.form);
        this.sendData(formData, this.onSuccess);
    };
}

export default Form