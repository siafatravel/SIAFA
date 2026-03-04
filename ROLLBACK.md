# Rollback (خيار رجوع سريع)

إذا صار أي خلل بعد توحيد صفحات الفنادق، فينا نرجع فورًا للحالة السابقة لهذه الرسالة.

## نقطة النسخة الاحتياطية
- Commit قبل التعديل: `604b38f35aaf31bbd9fb1ae44bbcf81ae171c509`
- Backup branch: `backup-before-hotel-template-unification-604b38f`

## أوامر الرجوع السريع
```bash
git reset --hard 604b38f35aaf31bbd9fb1ae44bbcf81ae171c509
```

أو:
```bash
git reset --hard backup-before-hotel-template-unification-604b38f
```

> ملاحظة: `reset --hard` يحذف أي تعديلات غير محفوظة على نفس الفرع.
