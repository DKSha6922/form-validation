import JustValidate from 'just-validate';

const form = document.getElementById("form");

const validate = new JustValidate(form);

validate.addField("#fname",[
    {
        rule:"required",
    },
    {
        rule:"minLength",
        value:3
    },
    {
        rule:"maxLength",
        value:20
    },

],
 {
    errorLabelCssClass: ["form-error"],
}
);

validate.addField("#mail",[
    {
        rule:"required",
    },
    {
        rule:"email",
    },
],
 {
    errorLabelCssClass: ["form-error"],
}
);

validate.addField("#cell",[
    {
        rule:"required",
    },
    {
        rule:"number",
    },
    {
        rule:"minLength",
        value:10
    },
    {
        rule:"maxLength",
        value:13
    }
],
 {
    errorLabelCssClass: ["form-error"],
}
);

validate.addField("#date",[
    {
        rule:"required",
    },
],
 {
    errorLabelCssClass: ["form-error"],
}
);

validate.addField("#address",[
    {
        rule:"required",
    },
],
 {
    errorLabelCssClass: ["form-error"],
}
);