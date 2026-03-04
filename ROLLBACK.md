# Rollback (خيار رجوع سريع)

إذا صار أي خلل بعد إضافة دعم اللغة الإنجليزية في الصفحة الرئيسية، فينا نرجع فورًا للحالة السابقة.

## نقطة النسخة الاحتياطية
- Commit قبل التعديل: `9bb6dc48d622581c7d5b6cf728c033a900cb5023`
- Backup branch: `backup-before-english-i18n-9bb6dc4`

## أوامر الرجوع السريع
```bash
git reset --hard 9bb6dc48d622581c7d5b6cf728c033a900cb5023
```

أو:
```bash
git reset --hard backup-before-english-i18n-9bb6dc4
```

> ملاحظة: `reset --hard` يحذف أي تعديلات غير محفوظة على نفس الفرع.
