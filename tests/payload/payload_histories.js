const job = {
  type: 1,
  sent: false,
  field: 'salary',
  fieldDescription: 'R$: 2.500,00',
  originalValue: 'salary',
  value: 'R$: 1.500,00'
};

const organization = {
  type: 1,
  sent: false,
  field: 'idcard',
  fieldDescription: '80.443.258/0001-66',
  originalValue: 'idcard',
  value: '80.443.258/0001-77'
};

const user = {
  type: 1, // History fields
  sent: false,
  field: 'name',
  fieldDescription: 'Thiago',
  originalValue: 'name',
  value: 'Anselmo'
};

module.exports = {
  job,
  organization,
  user
}