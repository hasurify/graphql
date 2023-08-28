const fs = require('fs');
const generatedFilePath = __dirname + '/src/shared/generated.ts'
const data = fs.readFileSync(generatedFilePath, 'utf-8');

const removeText = `export type JsonbComparisonExp = {
  _eq?: InputMaybe<Scalars['_jsonb']>;
  _gt?: InputMaybe<Scalars['_jsonb']>;
  _gte?: InputMaybe<Scalars['_jsonb']>;
  _in?: InputMaybe<Array<Scalars['_jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['_jsonb']>;
  _lte?: InputMaybe<Scalars['_jsonb']>;
  _neq?: InputMaybe<Scalars['_jsonb']>;
  _nin?: InputMaybe<Array<Scalars['_jsonb']>>;
};`;

const newValue = data.replace(removeText, '');
fs.writeFileSync(generatedFilePath, newValue, 'utf-8');