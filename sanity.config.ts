// sanity.config.ts
import { defineConfig, buildLegacyTheme } from 'sanity';
import { structureTool } from 'sanity/structure';
import React from 'react';
import { schemaTypes } from './sanity/schemaTypes';

// BUAT THEME DENGAN AKSEN HIJAU YANG LEBIH TERANG DAN SEGAR
const emeraldTheme = buildLegacyTheme({
  '--black': '#1f2937',
  '--white': '#ffffff',
  '--brand-primary': '#10b981', // Hijau terang emerald murni
  '--component-bg': '#ffffff',
  '--component-text-color': '#1f2937',
  '--focus-color': '#fbbf24',
});

export default defineConfig({
  name: 'default',
  title: 'Indonesia Mengaji',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ID_PROJECT_ANDA',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },

  theme: emeraldTheme,

  studio: {
    components: {
      navbar: (props) => {
        return React.createElement(
          'div',
          { style: { display: 'flex', flexDirection: 'column' } },
          React.createElement(
            'div',
            {
              style: {
                // Menggunakan background hijau terang solid sesuai request
                background: '#10b981', 
                color: 'white',
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #059669',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                gap: '12px'
              }
            },
            // 🚀 GANTI EMOT ICON MENJADI LOGO ASLI RELEVAN
            React.createElement('img', {
              src: '/images/logo-mengaji.png',
              alt: 'Logo Indonesia Mengaji',
              style: {
                height: '32px', // Menyesuaikan tinggi navbar studio
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }
            }),
            React.createElement(
              'div',
              null,
              React.createElement(
                'h1',
                { style: { margin: 0, fontSize: '14px', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase' } },
                'Yayasan Generasi Indonesia Mengaji'
              ),
              React.createElement(
                'p',
                { style: { margin: 0, fontSize: '10px', color: '#d1fae5', fontWeight: 600, letterSpacing: '0.3px' } },
                'DASHBOARD MANAJEMEN UTAMA'
              )
            )
          ),
          props.renderDefault(props)
        );
      },
    },
  },
});