import React from 'react';

import Layout from '@theme/Layout';

import ComponentDoc from '../ComponentDoc';
import config from '../../../component-docs.config';

function ComponentDocPage(props) {
  const { docgen } = props;

  // Whether it's the creator component page or the activity component page
  const isCreator = Boolean(Object.values(docgen).find(({ displayName }) => displayName === 'NoticePopup'));
  const order = isCreator ? config.componentOrder.creator : config.componentOrder.activity;
  const orderedComponentDocs = order.map((componentName) => {
    const match = Object.values(docgen).find(({ displayName }) => displayName === componentName);
    if (match) {
      return match;
    } else {
      console.warn(`Couldn't find "${componentName}" in the ${isCreator ? 'creator' : 'activity'} components`);
    }
  }).filter((docs) => docs);

  return (
    <Layout>
      <div>
        <main>
          <div className="container padding-vert--lg">
            {orderedComponentDocs.map((docs, index) =>
              <ComponentDoc docs={docs} key={index} />
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default ComponentDocPage;
