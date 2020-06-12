import { FC, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { WithTranslation } from 'next-i18next';
import NextI18NextInstance from '../../i18n.js';

import styles from './MoreBtn.module.css';
const { withTranslation, i18n } = NextI18NextInstance;
type Props = {
} & WithTranslation;
const MoreBtn: FC<Props> = ({ t }) => {
  useEffect(() => {
    import("scrollreveal").then((module) => {
      const ScrollReveal = module.default;
      ScrollReveal({
        delay: 1000,
        distance: "100px",
        duration: 1000,
        easing: "cubic-bezier(0.5, 0, 0, 1)",
      });
      ScrollReveal().reveal(`.${styles.more_btn}`);
    });
  }, []);
  return (
    <Link href={{ pathname: '/ProductCenter' }}>
      <div className={styles.more_btn}>
        <a>{t('更多')} +</a>
      </div>
    </Link>
  );
};
export async function getStaticProps() {
  return {
    props: { namespacesRequired: ['common'] }, // will be passed to the page component as props
  };
}
export default withTranslation('common')(MoreBtn);
